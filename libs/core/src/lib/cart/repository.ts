import { Cart, CartDto } from '@myexperiment/domain';

export interface ICartRepository {
  findAllByUserId(userId: number): Promise<Cart[]>;
  create(cart: CartDto): Promise<Cart>;
  delete(cartId: number): Promise<void>;
  deleteDeleteMany(cartIds: number[]): Promise<void>;
}
