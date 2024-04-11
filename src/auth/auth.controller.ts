import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '@commons/decorator';
import { SignInDto } from './dto/signIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() body: SignInDto) {
    return this.authService.login(body.email, body.password);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('register')
  register(@Body() body: SignInDto) {
    return this.authService.createUser(body.email, body.password);
  }
}
