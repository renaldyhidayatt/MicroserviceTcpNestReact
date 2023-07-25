import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { RoleModule, RoleRepository } from '../role';
import { Role, User } from '@myexperiment/domain';
import { UserRepository } from './repository';
import { UserService } from './service';

@Module({
  imports: [RoleModule, TypeOrmModule.forFeature([User, Role])],
  providers: [UserRepository, UserService, RoleRepository],
  exports: [UserService, UserRepository, RoleRepository],
})
export class UserModule {}
