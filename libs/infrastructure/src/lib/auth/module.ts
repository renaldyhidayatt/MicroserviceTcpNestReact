import { Module } from '@nestjs/common';
import { AuthService } from './service';
import { AuthRepository } from './repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role, User } from '@myexperiment/domain';
import { RoleModule, RoleRepository } from '../role';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    JwtModule.register({
      secret: 'SECRET_KEY',
      signOptions: { expiresIn: '1h' },
    }),

    RoleModule,
  ],
  providers: [AuthService, AuthRepository, RoleRepository],
  exports: [AuthService, AuthRepository, RoleRepository],
})
export class AuthModule {}
