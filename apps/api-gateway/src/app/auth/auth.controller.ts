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
import { JwtGuard, RoleGuard } from '@myexperiment/auth-guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
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

  @ApiBearerAuth()
  @UseGuards(JwtGuard, RoleGuard)
  @Get('/me')
  cekUser(@Request() req) {
    return req.user;
  }
}
