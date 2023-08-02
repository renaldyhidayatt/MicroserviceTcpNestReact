import { CreateRoleDto, UpdateRoleDto } from '@myexperiment/domain';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RoleService {
  constructor(@Inject('ROLE_SERVICE') private roleClient: ClientProxy) {}

  async findAll() {
    return this.roleClient.send({ cmd: 'get_roles' }, {});
  }

  async findById(id: number) {
    return this.roleClient.send({ cmd: 'get_role' }, id);
  }

  async createRole(dto: CreateRoleDto) {
    return this.roleClient.send({ cmd: 'create_role' }, dto);
  }

  async updateRole(id: number, dto: UpdateRoleDto) {
    return this.roleClient.send(
      { cmd: 'update_role' },
      { id, updateRole: dto }
    );
  }

  async deleteRole(id: number) {
    return this.roleClient.send({ cmd: 'delete_role' }, id);
  }
}
