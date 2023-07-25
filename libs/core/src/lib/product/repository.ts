import {
  CartDto,
  CreateProductDto,
  Product,
  UpdateProductDto,
} from '@myexperiment/domain';

export interface IProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: number): Promise<Product>;
  findBySlug(slug: string): Promise<Product>;
  createProduct(dto: CreateProductDto, file: string): Promise<Product>;
  updateProduct(
    id: number,
    dto: UpdateProductDto,
    file: string
  ): Promise<Product>;
  updateQuantity(car: CartDto[]): Promise<string>;
  deleteProduct(id: number): Promise<Product>;
}
