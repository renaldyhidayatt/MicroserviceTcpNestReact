import {
  ApiResponse,
  CartDto,
  CreateProductDto,
  UpdateProductDto,
} from '@myexperiment/domain';

export interface IProductService {
  findAll(): Promise<ApiResponse>;
  findById(id: number): Promise<ApiResponse>;
  findBySlug(slug: string): Promise<ApiResponse>;
  createProduct(
    dto: CreateProductDto,
    file: Express.Multer.File
  ): Promise<ApiResponse>;
  updateProduct(
    id: number,
    dto: UpdateProductDto,
    file: Express.Multer.File
  ): Promise<ApiResponse>;
  updateQuantity(car: CartDto[]): Promise<ApiResponse>;
  deleteProduct(id: number): Promise<ApiResponse>;
}
