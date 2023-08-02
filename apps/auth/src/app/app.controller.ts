import { Controller } from '@nestjs/common';

import { LoginDto, RegisterDto } from '@myexperiment/domain';
import { AuthService } from '@myexperiment/infrastructure';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'register_auth' })
  async register(register: RegisterDto) {
    return await this.authService.register(register);
  }

  @MessagePattern({ cmd: 'login_auth' })
  async login(login: LoginDto) {
    const token = await this.authService.login(login);
    return { token };
  }
}
