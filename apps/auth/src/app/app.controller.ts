import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { LoginDto, RegisterDto } from '@myexperiment/domain';
import { JwtGuard } from '@myexperiment/auth-guard';
import { AuthService } from '@myexperiment/infrastructure';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() register: RegisterDto) {
    return await this.authService.register(register);
  }

  @Post('/login')
  async login(@Body() login: LoginDto) {
    const token = await this.authService.login(login);
    return { token };
  }

  @Get('/me')
  @UseGuards(JwtGuard)
  cekUser(@Request() req) {
    return req.user;
  }
}
