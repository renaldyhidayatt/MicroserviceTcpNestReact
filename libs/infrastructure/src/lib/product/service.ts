import { IProductService } from '@myexperiment/core';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductRepository } from './repository';
import {
  ApiResponse,
  CreateProductDto,
  UpdateProductDto,
  CartDto,
} from '@myexperiment/domain';

@Injectable()
export class ProductService implements IProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async findAll(): Promise<ApiResponse> {
    try {
      const product = await this.productRepository.findAll();

      return new ApiResponse('Succces', product, '200');
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
  async findById(id: number): Promise<ApiResponse> {
    try {
      const product = await this.productRepository.findById(id);

      return new ApiResponse('Succes', product, '200');
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
  async findBySlug(slug: string): Promise<ApiResponse> {
    try {
      const product = await this.productRepository.findBySlug(slug);

      return new ApiResponse('Succes', product, '200');
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
  async createProduct(
    dto: CreateProductDto,
    file: Express.Multer.File
  ): Promise<ApiResponse> {
    try {
      const product = await this.productRepository.createProduct(
        dto,
        file.path
      );

      return new ApiResponse('Succes', product, '200');
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
  async updateProduct(
    id: number,
    dto: UpdateProductDto,
    file: Express.Multer.File
  ): Promise<ApiResponse> {
    try {
      const product = await this.productRepository.updateProduct(
        id,
        dto,
        file.path
      );
      return new ApiResponse('Succes', product, '200');
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
  async updateQuantity(cart: CartDto[]): Promise<ApiResponse> {
    try {
      const product = await this.productRepository.updateQuantity(cart);

      return new ApiResponse('Succes', product, '200');
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
  async deleteProduct(id: number): Promise<ApiResponse> {
    try {
      const product = await this.productRepository.deleteProduct(id);

      return new ApiResponse('Succes', product, '200');
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
