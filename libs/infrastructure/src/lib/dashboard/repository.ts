import { IDashboardRepository } from '@myexperiment/core';
import { Order, Product, User } from '@myexperiment/domain';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class DashboardRepository implements IDashboardRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Product) private productRepository: Repository<Product>
  ) {}

  async pendapatan(month: number): Promise<number> {
    try {
      const result = await this.orderRepository
        .createQueryBuilder('order')
        .select('SUM(order.total_price)', 'totalRevenue')
        .where('EXTRACT(MONTH FROM order.created_at) = :month', { month })
        .getRawOne();

      const totalRevenue = result.totalRevenue || 0;
      return totalRevenue;
    } catch (error) {
      throw new Error(
        `Failed to calculate revenue for month ${month}: ${error}`
      );
    }
  }

  async sumPendapatan(): Promise<number> {
    const result = await this.orderRepository
      .createQueryBuilder('order')
      .select('SUM(order.total_price)', 'totalRevenue')
      .getRawOne();

    const totalRevenue = result.totalRevenue || 0;
    return totalRevenue;
  }

  async countUser(): Promise<number> {
    try {
      const totalUsers = await this.userRepository.count();
      return totalUsers;
    } catch (error) {
      throw new Error('Failed to count users: ' + error);
    }
  }

  async countOrder(): Promise<number> {
    try {
      const totalOrders = await this.orderRepository.count();
      return totalOrders;
    } catch (error) {
      throw new Error('Failed to count orders: ' + error);
    }
  }

  async countProduct(): Promise<number> {
    try {
      const totalProducts = await this.productRepository.count();
      return totalProducts;
    } catch (error) {
      throw new Error('Failed to count products: ' + error);
    }
  }
}
