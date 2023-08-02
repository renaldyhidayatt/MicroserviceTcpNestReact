import { CreateOrderDto } from '@myexperiment/domain';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrderService {
  constructor(@Inject('ORDER_SERVICE') private orderClient: ClientProxy) {}

  async findByIdUser(id: number) {
    return this.orderClient.send({ cmd: 'order_find_user' }, id);
  }

  async createOrder(dto: CreateOrderDto) {
    return this.orderClient.send({ cmd: 'create_order' }, dto);
  }

  async findAll() {
    return this.orderClient.send({ cmd: 'get_orders' }, {});
  }

  async deleteOrder(id: string) {
    return this.orderClient.send({ cmd: 'delete_order' }, id);
  }
}
