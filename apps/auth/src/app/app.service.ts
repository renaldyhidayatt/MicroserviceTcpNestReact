import {
  ApiResponse,
  CreateUserDto,
  LoginDto,
  RegisterDto,
} from '@myexperiment/domain';
import { AuthService } from '@myexperiment/infrastructure';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly authService: AuthService) {}

  async login(dto: LoginDto): Promise<ApiResponse> {
    try {
      const user = await this.authService.login(dto);

      return user;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async register(dto: RegisterDto): Promise<ApiResponse> {
    try {
      const user = await this.authService.register(dto);

      return user;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
