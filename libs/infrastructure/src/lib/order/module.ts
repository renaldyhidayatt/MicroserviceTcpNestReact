import { Order, User } from '@myexperiment/domain';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleService } from '../role';
import { OrderRepository } from './repository';
import { OrderService } from './service';
import { UserModule, UserRepository } from '../user';

@Module({
  imports: [TypeOrmModule.forFeature([User, Order]), UserModule],
  providers: [OrderService, OrderRepository, UserRepository],
  exports: [OrderService, OrderRepository, UserRepository],
})
export class OrderModule {}
