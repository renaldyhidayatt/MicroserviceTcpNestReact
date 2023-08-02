import { IOrderService } from '@myexperiment/core';
import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderRepository } from './repository';
import { ApiResponse, CreateOrderDto } from '@myexperiment/domain';

@Injectable()
export class OrderService implements IOrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async deleteById(id: string): Promise<ApiResponse> {
    try {
      const order = this.orderRepository.deleteById(id);

      return new ApiResponse('Success', order, '200');
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async create(dto: CreateOrderDto): Promise<ApiResponse> {
    try {
      const order = this.orderRepository.create(dto);

      return new ApiResponse('Success', order, '200');
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async findAll(): Promise<ApiResponse> {
    try {
      const order = this.orderRepository.findAll();

      return new ApiResponse('Success', order, '200');
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
  async findByIdUser(userId: number): Promise<ApiResponse> {
    try {
      const order = this.orderRepository.findByIdUser(userId);

      return new ApiResponse('Success', order, '200');
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
