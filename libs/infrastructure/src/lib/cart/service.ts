import { ICartService } from '@myexperiment/core';
import { Injectable } from '@nestjs/common';
import { CartRepository } from './repository';
import { ApiResponse, Cart, CartDto } from '@myexperiment/domain';

@Injectable()
export class CartService implements ICartService {
  constructor(private readonly cartRepository: CartRepository) {}

  async findAllByUserId(userId: number): Promise<ApiResponse> {
    try {
      const carts = await this.cartRepository.findAllByUserId(userId);
      return new ApiResponse('Success', carts, '200');
    } catch (error) {
      console.log(error);
      return new ApiResponse('Error', null, '500');
    }
  }

  async create(cart: CartDto): Promise<ApiResponse> {
    try {
      const createdCart = await this.cartRepository.create(cart);
      return new ApiResponse('Success', createdCart, '201');
    } catch (error) {
      console.log(error);
      return new ApiResponse('Error', null, '500');
    }
  }

  async delete(cartId: number): Promise<ApiResponse> {
    try {
      await this.cartRepository.delete(cartId);
      return new ApiResponse('Success', null, '204');
    } catch (error) {
      console.log(error);
      return new ApiResponse('Error', null, '500');
    }
  }

  async deleteDeleteMany(cartIds: number[]): Promise<ApiResponse> {
    try {
      await this.cartRepository.deleteDeleteMany(cartIds);
      return new ApiResponse('Success', null, '204');
    } catch (error) {
      console.log(error);
      return new ApiResponse('Error', null, '500');
    }
  }
}
