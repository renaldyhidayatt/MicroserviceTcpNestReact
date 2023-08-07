import { ApiResponse, Cart, CartDto } from '@myexperiment/domain';

export interface ICartService {
  findAllByUserId(userId: number): Promise<ApiResponse>;
  create(cart: CartDto): Promise<ApiResponse>;
  delete(cartId: number): Promise<ApiResponse>;
  deleteDeleteMany(cartIds: number[]): Promise<ApiResponse>;
}
