import { Module } from '@nestjs/common';
import { ProductModule } from '../product';
import { UserService } from '../user';
import { CartRepository } from './repository';
import { CartService } from './service';

@Module({
  imports: [ProductModule, UserService],
  providers: [CartRepository, CartService],
  exports: [CartRepository, CartService],
})
export class CartModule {}
