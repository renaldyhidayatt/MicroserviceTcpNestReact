import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AuthModule,
  RoleModule,
  UserModule,
} from '@myexperiment/infrastructure';
import { Role, User } from '@myexperiment/domain';
import { JwtStrategy } from '@myexperiment/auth-guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'SECRET_KEY',
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Role],
      synchronize: true,
    }),
    AuthModule,
    RoleModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [JwtStrategy],
})
export class AppModule {}
