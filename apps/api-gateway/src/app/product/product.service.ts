import {
  CartDto,
  CreateProductDto,
  UpdateProductDto,
} from '@myexperiment/domain';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CloudinaryService } from 'libs/infrastructure/src/lib/cloudinary/service';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_SERVICE') private productClient: ClientProxy,
    private cloudinaryService: CloudinaryService
  ) {}

  async findAll() {
    return this.productClient.send({ cmd: 'get_products' }, {});
  }

  async findById(id: number) {
    return this.productClient.send({ cmd: 'get_product' }, id);
  }

  async findBySlug(slug: string) {
    return this.productClient.send({ cmd: 'get_slug_product' }, slug);
  }

  async createProduct(dto: CreateProductDto, file: Express.Multer.File) {
    const uploadResult = await this.cloudinaryService.uploadFile(file);

    dto.file = uploadResult.secure_url;

    return this.productClient.send({ cmd: 'create_product' }, dto);
  }

  async updateProduct(
    id: number,
    dto: UpdateProductDto,
    file: Express.Multer.File
  ) {
    const uploadResult = await this.cloudinaryService.uploadFile(file);

    console.log('dto category_id', dto.category_id);

    dto.file = uploadResult.secure_url;

    return this.productClient.send(
      { cmd: 'update_product' },
      { id, updateProduct: dto }
    );
  }

  async updateQuantity(cart: CartDto[]) {
    return this.productClient.send({ cmd: 'update_quantity_product' }, cart);
  }

  async deleteProduct(id: number) {
    return this.productClient.send({ cmd: 'delete_product' }, id);
  }
}
