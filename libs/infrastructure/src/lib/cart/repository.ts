import { ICartRepository } from '@myexperiment/core';
import { Cart, CartDto } from '@myexperiment/domain';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from '../user';
import { ProductRepository } from '../product';
import { NotFoundException } from '@nestjs/common';

export class CartRepository implements ICartRepository {
  constructor(
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
    private productRepository: ProductRepository,
    private userRepository: UserRepository
  ) {}

  async findAllByUserId(userId: number): Promise<Cart[]> {
    return this.cartRepository.find({ where: { user: { user_id: userId } } });
  }
  async create(dto: CartDto): Promise<Cart> {
    try {
      const product = await this.productRepository.findById(dto.product_id);
      const user = await this.userRepository.findById(dto.user_id);

      const createCart = this.cartRepository.create({
        name: dto.name,
        price: dto.price,
        image: dto.image_product,
        quantity: dto.quantity,
        product: product,
        user: user,
        weight: dto.weight,
      });

      return this.cartRepository.save(createCart);
    } catch (error) {
      console.log(error);
      throw new NotFoundException(error);
    }
  }
  async delete(cartId: number): Promise<void> {
    const cart = await this.cartRepository.findOne({
      where: { cart_id: cartId },
    });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    await this.cartRepository.remove(cart);
  }
  async deleteDeleteMany(cartIds: number[]): Promise<void> {
    if (!cartIds || cartIds.length === 0) {
      throw new Error('No cart ids');
    }
    for (const cartId of cartIds) {
      const cart = await this.cartRepository.findOne({
        where: {
          cart_id: cartId,
        },
      });

      if (!cart) {
        throw new NotFoundException(`Cart with ID ${cartId} not found`);
      }

      await this.cartRepository.remove(cart);
    }
  }
}
