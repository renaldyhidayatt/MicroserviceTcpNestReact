import {
  ApiResponse,
  CreateRoleDto,
  UpdateRoleDto,
} from '@myexperiment/domain';
import { RoleService } from '@myexperiment/infrastructure';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly roleService: RoleService) {}

  async getAllRoles(): Promise<ApiResponse> {
    try {
      return await this.roleService.findAll();
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async getRoleById(id: number): Promise<ApiResponse> {
    try {
      return await this.roleService.findById(id);
    } catch (err) {
      return new ApiResponse('Failed', err, '400');
    }
  }

  async createRole(dto: CreateRoleDto): Promise<ApiResponse> {
    try {
      return await this.roleService.createRole(dto);
    } catch (err) {
      return new ApiResponse('Failed', err, '400');
    }
  }

  async findRoleByName(name: string): Promise<ApiResponse> {
    try {
      return await this.roleService.findByName(name);
    } catch (err) {
      return new ApiResponse('Failed', err, '400');
    }
  }

  async updateRoleById(id: number, dto: UpdateRoleDto): Promise<ApiResponse> {
    try {
      return await this.roleService.updateById(id, dto);
    } catch (err) {
      return new ApiResponse('Failed', err, '400');
    }
  }

  async deleteRoleById(id: number): Promise<ApiResponse> {
    try {
      return await this.roleService.deleteById(id);
    } catch (err) {
      return new ApiResponse('Failed', err, '400');
    }
  }
}
