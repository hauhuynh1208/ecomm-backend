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
  async register(@Req() req, @Body() body, @Res() res) {
    const auth = await this.authService.createUser(body);
    res.status(auth.status).json(auth.msg);
  }
}
