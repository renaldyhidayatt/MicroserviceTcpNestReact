import { IOrderRepository } from '@myexperiment/core';
import { CreateOrderDto, Order } from '@myexperiment/domain';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from '../user';

export class OrderRepository implements IOrderRepository {
  constructor(
    private userRepository: UserRepository,
    @InjectRepository(Order) private orderRepository: Repository<Order>
  ) {}

  async findAll(): Promise<Order[]> {
    try {
      const order = this.orderRepository
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.user', 'user')
        .getMany();

      return order;
    } catch (error) {
      throw new Error('Failed message: ' + error.message);
    }
  }

  async deleteById(id: string): Promise<any> {
    try {
      const order = await this.orderRepository.findOne({
        where: {
          order_id: id,
        },
      });

      if (order == null) {
        throw new Error('Failed not found product');
      }

      return await this.orderRepository.remove(order);
    } catch (error) {
      throw new Error('Failed message: ' + error.message);
    }
  }

  async findByIdUser(userId: number): Promise<Order[]> {
    return this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.user', 'user')
      .where('user.user_id = :userId', { userId })
      .getMany();
  }

  async create(dto: CreateOrderDto): Promise<Order> {
    try {
      const user = await this.userRepository.findById(dto.user_id);

      if (user == null) {
        throw new Error('Failed not found user');
      }

      const createOrder = this.orderRepository.create({
        nama: dto.nama,
        phone: dto.phone,
        provinsi: dto.provinsi,
        kota: dto.kota,
        alamat: dto.alamat,
        kurir: dto.kurir,
        shippingMethod: dto.shippingMethod,
        shippingCost: dto.shippingCost,
        total_product: dto.totalProduct,
        total_price: dto.totalPrice,
        user: user,
      });

      const saved = this.orderRepository.save(createOrder);

      return saved;
    } catch (error) {
      throw new Error('Failed message: ' + error.message);
    }
  }
}
