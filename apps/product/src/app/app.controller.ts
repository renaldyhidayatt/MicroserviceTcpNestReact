import { Controller } from '@nestjs/common';

import { ProductService } from '@myexperiment/infrastructure';
import {
  ApiResponse,
  CartDto,
  CreateProductDto,
  UpdateProductDto,
} from '@myexperiment/domain';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern({ cmd: 'get_products' })
  findAll(): Promise<ApiResponse> {
    return this.productService.findAll();
  }

  @MessagePattern({ cmd: 'get_product' })
  findById(id: number): Promise<ApiResponse> {
    return this.productService.findById(id);
  }

  @MessagePattern({ cmd: 'get_slug_product' })
  findBySlug(slug: string): Promise<ApiResponse> {
    return this.productService.findBySlug(slug);
  }

  @MessagePattern({ cmd: 'create_product' })
  create(createProduct: CreateProductDto) {
    return this.productService.createProduct(createProduct);
  }

  @MessagePattern({ cmd: 'update_product' })
  updateById(data: {
    id: number;
    updateProduct: UpdateProductDto;
  }): Promise<ApiResponse> {
    const { id, updateProduct } = data;

    console.log('Dto Category_id', updateProduct.category_id);

    return this.productService.updateProduct(id, updateProduct);
  }

  @MessagePattern({ cmd: 'update_quantity_product' })
  updateQuantity(cart: CartDto[]) {
    return this.productService.updateQuantity(cart);
  }

  @MessagePattern({ cmd: 'delete_product' })
  deleteById(id: number) {
    return this.productService.deleteProduct(id);
  }
}
