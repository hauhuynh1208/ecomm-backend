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

  async hashPassword(password: string) {
    return bcrypt.hash(password, this.configService.get('jwt').bcrypt_salt);
  }

  async login(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email: email },
      select: ['id', 'email', 'password'],
    });
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

  async createUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) throw new BadRequestException('Email existed');
    const _password = await this.hashPassword(password);
    return this.userRepository.save({
      email,
      password: _password,
    });
  }
}
