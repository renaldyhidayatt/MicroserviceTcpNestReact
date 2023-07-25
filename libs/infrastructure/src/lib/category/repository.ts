import { ICategoryRepository } from '@myexperiment/core';
import {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@myexperiment/domain';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import slugify from 'slugify';
import * as fs from 'fs';

export class CategoryRepository implements ICategoryRepository {
  constructor(
    @InjectRepository(Category) private categoryRepository: Repository<Category>
  ) {}

  async findAll(): Promise<Category[]> {
    try {
      const category = this.categoryRepository.find();

      return category;
    } catch (err) {
      throw new Error('Failed message ' + err);
    }
  }

  async findById(id: number): Promise<Category> {
    try {
      const catgory = this.categoryRepository.findOne({
        where: { category_id: id },
      });

      return catgory;
    } catch (err) {
      throw new Error('Failed message ' + err);
    }
  }

  async createCategory(
    dto: CreateCategoryDto,
    file: string
  ): Promise<Category> {
    try {
      const slug = slugify(dto.name, { lower: true });

      const createCategory = this.categoryRepository.create({
        nama_kategori: dto.name,
        image_category: file,
        slug_category: slug,
      });

      const saved = await this.categoryRepository.save(createCategory);

      return saved;
    } catch (err) {
      throw new Error('Failed message: ' + err);
    }
  }

  async updateCategory(
    id: number,
    dto: UpdateCategoryDto,
    file: string
  ): Promise<Category> {
    try {
      const findById = await this.findById(id);

      if (findById == null) {
        throw new Error('Failed not found category');
      }

      if (findById.image_category) {
        fs.unlinkSync(findById.image_category);
      }
      const slug = slugify(dto.name, { lower: true });

      findById.nama_kategori = dto.name;
      findById.image_category = file;
      findById.slug_category = slug;

      const categoryUpdate = await this.categoryRepository.save(findById);

      return categoryUpdate;
    } catch (err) {
      throw new Error('Faield message: ' + err);
    }
  }

  async deleteCategory(id: number): Promise<Category> {
    try {
      const categoryById = await this.findById(id);

      if (categoryById == null) {
        throw new Error('Failed not found category');
      }

      if (categoryById.image_category) {
        fs.unlinkSync(categoryById.image_category);
      }

      return await this.categoryRepository.remove(categoryById);
    } catch (err) {
      throw new Error('Failed message: ' + err);
    }
  }

  async findByName(name: string): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOne({
        where: {
          nama_kategori: name,
        },
      });

      return category;
    } catch (err) {
      throw new Error('Failed message: ' + err);
    }
  }

  async findBySlug(slug: string): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOne({
        where: {
          slug_category: slug,
        },
        relations: ['products'],
      });

      return category;
    } catch (e) {
      throw new Error('Failed message: ' + e);
    }
  }
}
