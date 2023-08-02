import { LoginDto, RegisterDto } from '@myexperiment/domain';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_SERVICE') private authClient: ClientProxy) {}

  async login(dto: LoginDto): Promise<any> {
    return this.authClient.send({ cmd: 'login_auth' }, dto);
  }

  async register(dto: RegisterDto): Promise<any> {
    return this.authClient.send({ cmd: 'register_auth' }, dto);
  }
}
