import { ApiResponse, LoginDto, RegisterDto } from '@myexperiment/domain';

export interface IAuthService {
  login(dto: LoginDto): Promise<ApiResponse>;
  register(dto: RegisterDto): Promise<ApiResponse>;
}
