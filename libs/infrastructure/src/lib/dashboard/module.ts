import { Cart, Category, Order, Product, User } from '@myexperiment/domain';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository, CategoryService } from '../category';

@Module({
  imports: [TypeOrmModule.forFeature([User, Order, Product, Category, Cart])],
  providers: [CategoryRepository, CategoryService],
  exports: [CategoryService, CategoryRepository],
})
export class DashboardModule {}
