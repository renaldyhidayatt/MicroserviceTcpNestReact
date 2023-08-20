import { Module } from '@nestjs/common';
import { ProductModule } from '../product';
import { UserModule } from '../user';
import { CartRepository } from './repository';
import { CartService } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart, Role, User } from '@myexperiment/domain';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Cart]),
    ProductModule,
    UserModule,
  ],
  providers: [CartRepository, CartService],
  exports: [CartRepository, CartService],
})
export class CartModule {}
