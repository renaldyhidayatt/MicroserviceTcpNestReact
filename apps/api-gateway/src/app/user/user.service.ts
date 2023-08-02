import { CreateUserDto, UpdateUserDto } from '@myexperiment/domain';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(private userClient: ClientProxy) {}

  async findAll() {
    return this.userClient.send({ cmd: 'get_users' }, {});
  }

  async findById(id: number) {
    return this.userClient.send({ cmd: 'get_user' }, id);
  }

  async createUser(dto: CreateUserDto) {
    return this.userClient.send({ cmd: 'create_user' }, dto);
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    return this.userClient.send({ cmd: 'update_user' }, { id, dto });
  }

  async deleteUser(id: number) {
    return this.userClient.send({ cmd: 'delete_user' }, id);
  }
}
