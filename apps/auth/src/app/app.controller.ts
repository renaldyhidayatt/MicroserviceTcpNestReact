import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { AppService } from './app.service';
import { LoginDto, RegisterDto } from '@myexperiment/domain';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/register')
  async register(@Body() register: RegisterDto) {
    return await this.appService.register(register);
  }

  @Post('/login')
  async login(@Body() login: LoginDto) {
    const token = await this.appService.login(login);
    return { token };
  }
}
