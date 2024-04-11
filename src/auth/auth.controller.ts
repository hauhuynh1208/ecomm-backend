import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Req() req, @Body() body, @Res() res) {
    const auth = await this.authService.login(body);
    res.status(auth.status).json(auth.msg);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('register')
  async register(@Req() req, @Body() body, @Res() res) {
    const auth = await this.authService.createUser(body);
    res.status(auth.status).json(auth.msg);
  }
}
