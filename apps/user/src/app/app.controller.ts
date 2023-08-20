import { Controller } from '@nestjs/common';

import {
  ApiResponse,
  CreateUserDto,
  UpdateUserDto,
} from '@myexperiment/domain';
import { UserService } from '@myexperiment/infrastructure';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'create_user' })
  async createUser(createUser: CreateUserDto): Promise<ApiResponse> {
    return await this.userService.createUser(createUser);
  }

  @MessagePattern({ cmd: 'get_users' })
  async getAllUsers(): Promise<ApiResponse> {
    return await this.userService.getAllUsers();
  }

  @MessagePattern({ cmd: 'get_user' })
  async getUserById(id: number): Promise<ApiResponse> {
    return await this.userService.getUserById(id);
  }

  @MessagePattern({ cmd: 'update_user' })
  updateById(data: { id: number; updateUser: UpdateUserDto }) {
    const { id, updateUser } = data;
    return this.userService.updateUserById(id, updateUser);
  }

  @MessagePattern({ cmd: 'delete_user' })
  deleteById(id: number) {
    return this.userService.deleteUserById(id);
  }
}
