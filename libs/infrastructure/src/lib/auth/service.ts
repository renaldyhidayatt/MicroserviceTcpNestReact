import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthService } from '@myexperiment/core';
import { AuthRepository } from './repository';
import {
  ApiResponse,
  AuthResponse,
  LoginDto,
  RegisterDto,
} from '@myexperiment/domain';

import { PasswordHash } from '../utils';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private authRepository: AuthRepository,

    private jwtService: JwtService
  ) {}

  async login(dto: LoginDto): Promise<ApiResponse> {
    try {
      const auth = await this.authRepository.findByEmail(dto.email);
      const password = new PasswordHash();

      if (auth) {
        const valid = await password.correctPassword(
          dto.password,
          auth.password
        );
        if (valid) {
          const authResponse = new AuthResponse(auth);

          const token = this.generateToken(auth);

          return new ApiResponse('Success', { authResponse, token }, '200');
        } else {
          throw new BadRequestException({
            message: 'Error Password',
          });
        }
      } else {
        throw new BadRequestException({
          message: 'Email not found',
        });
      }
    } catch (err) {
      return new ApiResponse('Failed', err, '400');
    }
  }

  async register(dto: RegisterDto): Promise<ApiResponse> {
    try {
      const auth = await this.authRepository.createUser(dto);

      const authResponse = new AuthResponse(auth);

      const token = this.generateToken(auth);

      return new ApiResponse('Success', { authResponse, token }, '200');
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  private generateToken(user: any): string {
    const dataToken = {
      id: user.user_id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
    };

    const secret = 'SECRET_KEY';
    const token = this.jwtService.sign(dataToken, { secret });

    return token;
  }
}
