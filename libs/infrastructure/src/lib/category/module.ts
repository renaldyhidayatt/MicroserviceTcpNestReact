import { Category } from '@myexperiment/domain';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository } from './repository';
import { CategoryService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryService, CategoryRepository],
  exports: [CategoryService, CategoryRepository],
})
export class CategoryModule {}
