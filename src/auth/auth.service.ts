import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entity';
import { LoggerService } from 'src/logger/logger.service';
import { Repository } from 'typeorm';
import { UsersDTO } from './dto/users.dto';
import { validate } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private logger: LoggerService,
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOneBy({ email });
    if (user === null) throw new BadRequestException('Email is not existed');

    const isPasswordMatched = await this.comparePassword(
      password,
      user.password,
    );
    if (!isPasswordMatched) {
      throw new BadRequestException('Password incorrect');
    }
    const secret = this.configService.get('jwt').jwt_secret;
    const { password: pw, ...rest } = user;
    const payload = {
      id: user.id,
      email: user.email,
    };
    return {
      ...rest,
      access_token: await this.jwtService.signAsync(payload, { secret }),
    };
  }

  async createUser(body: any): Promise<Record<string, any>> {
    let isOk = false;
    const userDTO = new UsersDTO();
    userDTO.email = body.email;
    userDTO.password = bcrypt.hashSync(body.password, 10);

    await validate(userDTO).then((errors) => {
      if (errors.length > 0) {
        this.logger.debug(`${errors}`, AuthService.name);
      } else {
        isOk = true;
      }
    });
    if (isOk) {
      await this.userRepository.save(userDTO).catch((error) => {
        this.logger.debug(error.message, AuthService.name);
      });
      if (isOk) {
        return { status: 201, content: { msg: `User created with success` } };
      } else {
        return { status: 400, content: { msg: 'User already exists' } };
      }
    } else {
      return { status: 400, content: { msg: 'Invalid content' } };
    }
  }
}
