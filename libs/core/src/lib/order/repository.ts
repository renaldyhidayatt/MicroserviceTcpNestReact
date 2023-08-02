import { CreateOrderDto, Order } from '@myexperiment/domain';

export interface IOrderRepository {
  findAll(): Promise<Order[]>;
  deleteById(id: string): Promise<Order>;
  findByIdUser(userId: number): Promise<Order[]>;
  create(dto: CreateOrderDto): Promise<Order>;
}
