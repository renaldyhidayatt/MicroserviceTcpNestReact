import { IUserService } from '@myexperiment/core';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './repository';
import {
  ApiResponse,
  CreateUserDto,
  UpdateUserDto,
} from '@myexperiment/domain';

@Injectable()
export class UserService implements IUserService {
  constructor(private userRepository: UserRepository) {}

  async getAllUsers(): Promise<ApiResponse> {
    try {
      const users = await this.userRepository.findAll();
      return new ApiResponse('Success', users, '200');
    } catch (err) {
      throw new BadRequestException('Failed to fetch users');
    }
  }

  async getUserById(id: number): Promise<ApiResponse> {
    try {
      const user = await this.userRepository.findById(id);
      return new ApiResponse('Success', user, '200');
    } catch (err) {
      throw new BadRequestException('User not found');
    }
  }

  async getUserByEmail(email: string): Promise<ApiResponse> {
    try {
      const user = await this.userRepository.findByEmail(email);
      return new ApiResponse('Success', user, '200');
    } catch (err) {
      throw new BadRequestException('User with the given email not found');
    }
  }

  async createUser(user: CreateUserDto): Promise<ApiResponse> {
    try {
      const createdUser = await this.userRepository.create(user);
      return new ApiResponse('Success', createdUser, '201');
    } catch (err) {
      throw new BadRequestException('Failed to create user');
    }
  }

  async updateUserById(
    id: number,
    user: UpdateUserDto,
    file: Express.Multer.File
  ): Promise<ApiResponse> {
    try {
      const updatedUser = await this.userRepository.updateById(
        id,
        user,
        file.path
      );
      return new ApiResponse('Success', updatedUser, '200');
    } catch (err) {
      throw new BadRequestException('Failed to update user');
    }
  }

  async deleteUserById(id: number): Promise<ApiResponse> {
    try {
      await this.userRepository.deleteById(id);
      return new ApiResponse('Success', null, '200');
    } catch (err) {
      throw new BadRequestException('Failed to delete user');
    }
  }
}
