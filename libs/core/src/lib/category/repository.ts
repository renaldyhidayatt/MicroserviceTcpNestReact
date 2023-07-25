import {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@myexperiment/domain';

export interface ICategoryRepository {
  findAll(): Promise<Category[]>;
  findById(id: number): Promise<Category>;
  createCategory(dto: CreateCategoryDto, file: string): Promise<Category>;
  updateCategory(
    id: number,
    dto: UpdateCategoryDto,
    file: string
  ): Promise<Category>;
  deleteCategory(id: number): Promise<Category>;
  findByName(name: string): Promise<Category>;
  findBySlug(slug: string): Promise<Category>;
}
