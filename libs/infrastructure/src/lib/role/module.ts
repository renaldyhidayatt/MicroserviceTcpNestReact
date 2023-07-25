import { Module } from '@nestjs/common';
import { RoleService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '@myexperiment/domain';
import { RoleRepository } from './repository';
import { UserModule } from '../user';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RoleService, RoleRepository],
  exports: [RoleService, RoleRepository],
})
export class RoleModule {}
