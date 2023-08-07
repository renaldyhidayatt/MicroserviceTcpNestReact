import { ApiResponse, CartDto } from '@myexperiment/domain';
import { CartService } from '@myexperiment/infrastructure';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly cartService: CartService) {}

  @MessagePattern({ cmd: 'findall' })
  async findAll(user_id: number): Promise<ApiResponse> {
    return this.cartService.findAllByUserId(user_id);
  }

  @MessagePattern({ cmd: 'create_cart' })
  async create(cart: CartDto): Promise<ApiResponse> {
    return this.cartService.create(cart);
  }

  @MessagePattern({ cmd: 'delete_cart' })
  async deleteCart(id: number): Promise<ApiResponse> {
    return this.cartService.delete(id);
  }

  @MessagePattern({ cmd: 'delete_many' })
  async deleteMany(cartIds: number[]): Promise<ApiResponse> {
    return this.cartService.deleteDeleteMany(cartIds);
  }
}
