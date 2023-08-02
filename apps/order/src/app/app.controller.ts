import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { OrderService } from '@myexperiment/infrastructure';
import { ApiResponse, CreateOrderDto } from '@myexperiment/domain';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern({ cmd: 'order_find_user' })
  async findByuserId(id: number): Promise<ApiResponse> {
    return this.orderService.findByIdUser(id);
  }

  @MessagePattern({ cmd: 'create_order' })
  async createOrder(dto: CreateOrderDto): Promise<ApiResponse> {
    return await this.orderService.create(dto);
  }

  @MessagePattern({ cmd: 'get_orders' })
  async findAll(): Promise<ApiResponse> {
    return await this.orderService.findAll();
  }

  @MessagePattern({ cmd: 'delete_order' })
  async deleteOrder(id: string) {
    return await this.orderService.deleteById(id);
  }
}
