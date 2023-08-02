import { Body, Controller, Param } from '@nestjs/common';
import {
  ApiResponse,
  CreateRoleDto,
  UpdateRoleDto,
} from '@myexperiment/domain';
import { RoleService } from '@myexperiment/infrastructure';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly roleService: RoleService) {}

  @MessagePattern({ cmd: 'create_role' })
  create(@Body() createRole: CreateRoleDto): Promise<ApiResponse> {
    return this.roleService.createRole(createRole);
  }

  @MessagePattern({ cmd: 'get_roles' })
  findAll(): Promise<ApiResponse> {
    return this.roleService.findAll();
  }

  @MessagePattern({ cmd: 'get_role' })
  findById(id: number): Promise<ApiResponse> {
    return this.roleService.findById(id);
  }

  @MessagePattern({ cmd: 'update_role' })
  updateById(id: number, updateRole: UpdateRoleDto) {
    return this.roleService.updateById(id, updateRole);
  }

  @MessagePattern({ cmd: 'delete_role' })
  deleteById(id: number) {
    return this.roleService.deleteById(id);
  }
}
