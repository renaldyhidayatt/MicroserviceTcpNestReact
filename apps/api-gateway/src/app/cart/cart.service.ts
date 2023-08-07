import { CartDto } from '@myexperiment/domain';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CartService {
  constructor(@Inject('CART_SERVICE') private cartClient: ClientProxy) {}

  async findAll(user_id: number) {
    return this.cartClient.send({ cmd: 'findall' }, user_id);
  }

  async create(cart: CartDto) {
    return this.cartClient.send({ cmd: 'create_cart' }, cart);
  }

  async deleteCart(id: number) {
    return this.cartClient.send({ cmd: 'delete_cart' }, id);
  }

  async deleteMany(cartIds: number[]) {
    return this.cartClient.send({ cmd: 'delete_many' }, cartIds);
  }
}
