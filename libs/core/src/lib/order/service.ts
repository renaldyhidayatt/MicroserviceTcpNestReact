import { ApiResponse, CreateOrderDto } from '@myexperiment/domain';

export interface IOrderService {
  findAll(): Promise<ApiResponse>;
  deleteById(id: string): Promise<ApiResponse>;
  findByIdUser(userId: number): Promise<ApiResponse>;
  create(dto: CreateOrderDto): Promise<ApiResponse>;
}
