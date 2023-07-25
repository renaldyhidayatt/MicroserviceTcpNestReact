import { Category, Product } from '@myexperiment/domain';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './repository';
import { ProductService } from './service';
import { CategoryRepository } from '../category';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],
  providers: [ProductRepository, ProductService, CategoryRepository],
  exports: [ProductRepository, ProductService, CategoryRepository],
})
export class ProductModule {}
