import { IProductRepository } from '@myexperiment/core';
import {
  CartDto,
  CreateProductDto,
  Product,
  UpdateProductDto,
} from '@myexperiment/domain';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryRepository } from '../category';
import slugify from 'slugify';
import * as fs from 'fs';

export class ProductRepository implements IProductRepository {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    private categoryRepository: CategoryRepository
  ) {}

  async findAll(): Promise<Product[]> {
    try {
      const product = this.productRepository.find();

      return product;
    } catch (e) {
      throw new Error('Failed message ' + e);
    }
  }

  async findById(id: number): Promise<Product> {
    try {
      const product = this.productRepository.findOne({
        where: {
          product_id: id,
        },
      });

      return product;
    } catch (e) {
      throw new Error('Failed message ' + e);
    }
  }

  async findBySlug(slug: string): Promise<Product> {
    try {
      const product = this.productRepository.findOne({
        where: {
          slug_product: slug,
        },
      });

      return product;
    } catch (e) {
      throw new Error('Failed message ' + e);
    }
  }

  async createProduct(dto: CreateProductDto): Promise<Product> {
    try {
      const category = await this.categoryRepository.findById(dto.category_id);
      if (category == null) {
        throw new Error('Failed not found category');
      }

      const slug = slugify(dto.name, { lower: true });

      const createproduct = this.productRepository.create({
        name: dto.name,
        image_product: dto.file,
        category: category,
        description: dto.description,
        price: dto.price,
        countInStock: dto.countInStock,
        slug_product: slug,
        weight: dto.weight
      });

      const saved = await this.productRepository.save(createproduct);

      return saved;
    } catch (e) {
      throw new Error('Failed message ' + e);
    }
  }

  async updateQuantity(cart: CartDto[]): Promise<string> {
    try {
      if (!cart || cart.length === 0) {
        throw new Error('No cart data received');
      }

      for (const item of cart) {
        const productId = item.product_id;
        const quantity = item.quantity;
        let response: any;

        const product: Product = await this.findById(productId);
        const currentStock = product.countInStock;

        const newStock = currentStock - quantity;

        const result = this.myupdateQuantity(productId, newStock);

        if (result) {
          response = `Product quantity updated: ${quantity} for product ID: ${productId}`;
        } else {
          response = `Error updating quantity for product ID: ${productId}`;
        }

        return response;
      }
    } catch (error) {
      throw new Error('Failed Error ' + error);
    }
  }

  private async myupdateQuantity(
    productId: number,
    quantity: number
  ): Promise<boolean> {
    try {
      const product = await this.productRepository.findOne({
        where: {
          product_id: productId,
        },
      });

      if (!product) {
        throw new Error(`Product with ID ${productId} not found.`);
      }

      product.countInStock = quantity;
      await this.productRepository.save(product);

      return true;
    } catch (error) {
      throw new Error(`Error updating product quantity: ${error.message}`);
    }
  }

  async updateProduct(id: number, dto: UpdateProductDto): Promise<Product> {
    try {
      const findById = await this.findById(id);
      if (findById == null) {
        throw new Error('Failed not found product');
      }

      const category = await this.categoryRepository.findById(dto.category_id);
      if (category == null) {
        throw new Error('Failed not found category');
      }
      const slug = slugify(dto.name, { lower: true });

      if (findById.image_product) {
        fs.unlinkSync(findById.image_product);
      }

      findById.name = dto.name;
      findById.image_product = dto.file;
      findById.category = category;
      findById.description = dto.description;
      findById.price = dto.price;
      findById.countInStock = dto.countInStock;
      findById.slug_product = slug;

      const productUpdate = await this.productRepository.save(findById);

      return productUpdate;
    } catch (e) {
      throw new Error('Failed message ' + e);
    }
  }

  async deleteProduct(id: number) {
    try {
      const productById = await this.findById(id);

      if (productById == null) {
        throw new Error('Failed not found product');
      }

      if (productById.image_product) {
        fs.unlinkSync(productById.image_product);
      }

      return await this.productRepository.remove(productById);
    } catch (e) {
      throw new Error('Failed message ' + e);
    }
  }
}
