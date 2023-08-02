import { ICategoryService } from '@myexperiment/core';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoryRepository } from './repository';
import {
  ApiResponse,
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@myexperiment/domain';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async findAll(): Promise<ApiResponse> {
    try {
      const category = await this.categoryRepository.findAll();

      return new ApiResponse('Success', category, '200');
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async findById(id: number): Promise<ApiResponse> {
    try {
      const category = await this.categoryRepository.findById(id);

      return new ApiResponse('Succes', category, '200');
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async createCategory(dto: CreateCategoryDto): Promise<ApiResponse> {
    try {
      const byname = await this.categoryRepository.findByName(dto.name);

      if (byname != null) {
        throw new Error('Failed name already exists');
      }

      const createCategory = this.categoryRepository.createCategory(dto);

      return new ApiResponse('Success', createCategory, '200');
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async updateCategory(
    id: number,
    dto: UpdateCategoryDto
  ): Promise<ApiResponse> {
    try {
      const update = this.categoryRepository.updateCategory(id, dto);

      return new ApiResponse('Success', update, '200');
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async deleteCategory(id: number): Promise<ApiResponse> {
    try {
      const result = await this.categoryRepository.deleteCategory(id);

      return new ApiResponse('Success', result, '200');
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async findBySlug(slug: string): Promise<ApiResponse> {
    try {
      const result = await this.categoryRepository.findBySlug(slug);

      return new ApiResponse('Success', result, '200');
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
