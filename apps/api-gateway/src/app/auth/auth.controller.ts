import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from '@myexperiment/domain';
import { JwtGuard } from '@myexperiment/auth-guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(@Body() register: RegisterDto) {
    return await this.authService.register(register);
  }

  @Post('/login')
  async login(@Body() login: LoginDto) {
    const token = await this.authService.login(login);
    return token;
  }

  @Get('/me')
  @UseGuards(JwtGuard)
  cekUser(@Request() req) {
    return req.user;
  }
}
