import {
  ApiResponse,
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@myexperiment/domain';

export interface ICategoryService {
  findAll(): Promise<ApiResponse>;
  findById(id: number): Promise<ApiResponse>;
  createCategory(dto: CreateCategoryDto, file: any): Promise<ApiResponse>;
  updateCategory(
    id: number,
    dto: UpdateCategoryDto,
    file: any
  ): Promise<ApiResponse>;
  deleteCategory(id: number): Promise<ApiResponse>;
  findBySlug(slug: string): Promise<ApiResponse>;
}
