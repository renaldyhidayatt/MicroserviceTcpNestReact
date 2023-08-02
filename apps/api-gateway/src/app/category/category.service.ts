import { CreateCategoryDto, UpdateCategoryDto } from '@myexperiment/domain';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_SERVICE') private categoryClient: ClientProxy
  ) {}

  async findAll() {
    return this.categoryClient.send({ cmd: 'get_categories' }, {});
  }

  async findById(id: number) {
    return this.categoryClient.send({ cmd: 'get_category' }, id);
  }

  async findBySlug(slug: string) {
    return this.categoryClient.send({ cmd: 'get_slug_category' }, slug);
  }

  async createCategory(dto: CreateCategoryDto) {
    return this.categoryClient.send({ cmd: 'create_category' }, dto);
  }

  async updateCategory(id: number, dto: UpdateCategoryDto) {
    return this.categoryClient.send(
      { cmd: 'update_category' },
      { id: id, dto: dto }
    );
  }

  async deleteCategory(id: number) {
    return this.categoryClient.send({ cmd: 'delete_category' }, id);
  }
}
