import {
  CartDto,
  CreateProductDto,
  UpdateProductDto,
} from '@myexperiment/domain';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProductService {
  constructor(@Inject('PRODUCT_SERVICE') private productClient: ClientProxy) {}

  async findAll() {
    return this.productClient.send({ cmd: 'get_products' }, {});
  }

  async findById(id: number) {
    return this.productClient.send({ cmd: 'get_product' }, id);
  }

  async findBySlug(slug: string) {
    return this.productClient.send({ cmd: 'get_slug_product' }, slug);
  }

  async createProduct(dto: CreateProductDto) {
    return this.productClient.send({ cmd: 'create_product' }, dto);
  }

  async updateProduct(id: number, dto: UpdateProductDto) {
    return this.productClient.send({ cmd: 'update_product' }, { id, dto });
  }

  async updateQuantity(cart: CartDto[]) {
    return this.productClient.send({ cmd: 'update_quantity_product' }, cart);
  }

  async deleteProduct(id: number) {
    return this.productClient.send({ cmd: 'delete_product' }, id);
  }
}
