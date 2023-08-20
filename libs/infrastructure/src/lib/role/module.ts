import { Module } from '@nestjs/common';
import { RoleService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart, Role, User } from '@myexperiment/domain';
import { RoleRepository } from './repository';
import { UserModule } from '../user';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Cart])],
  providers: [RoleService, RoleRepository],
  exports: [RoleService, RoleRepository],
})
export class RoleModule {}
