import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import {
  ApiResponse,
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@myexperiment/domain';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { CategoryService } from '@myexperiment/infrastructure';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly categoryService: CategoryService) {}

  @MessagePattern({ cmd: 'get_categories' })
  findAll(): Promise<ApiResponse> {
    return this.categoryService.findAll();
  }

  @MessagePattern({ cmd: 'get_category' })
  findById(id: number): Promise<ApiResponse> {
    return this.categoryService.findById(id);
  }

  @MessagePattern({ cmd: 'get_slug_category' })
  findBySlug(slug: string): Promise<ApiResponse> {
    return this.categoryService.findBySlug(slug);
  }

  @MessagePattern({ cmd: 'create_category' })
  create(createCategory: CreateCategoryDto): Promise<ApiResponse> {
    return this.categoryService.createCategory(createCategory);
  }

  @MessagePattern({ cmd: 'update_category' })
  updateById(
    id: number,
    updateCategoryDto: UpdateCategoryDto
  ): Promise<ApiResponse> {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @MessagePattern({ cmd: 'delete_category' })
  deleteById(id: number) {
    return this.categoryService.deleteCategory(id);
  }
}
