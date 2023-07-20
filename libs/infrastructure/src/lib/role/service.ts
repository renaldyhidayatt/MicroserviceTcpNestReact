import {
  ApiResponse,
  CreateRoleDto,
  UpdateRoleDto,
} from '@myexperiment/domain';
import { IRoleService } from '@myexperiment/core';
import { RoleRepository } from './repository';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class RoleService implements IRoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async findAll(): Promise<ApiResponse> {
    try {
      const roles = await this.roleRepository.findAll();
      return new ApiResponse('Success', roles, '200');
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async findById(id: number): Promise<ApiResponse> {
    try {
      const role = await this.roleRepository.findById(id);
      return new ApiResponse('Success', role, '200');
    } catch (err) {
      return new ApiResponse('Failed', err, '400');
    }
  }

  async createRole(dto: CreateRoleDto): Promise<ApiResponse> {
    try {
      const role = await this.roleRepository.createRole(dto);
      return new ApiResponse('Success', role, '200');
    } catch (err) {
      return new ApiResponse('Failed', err, '400');
    }
  }

  async findByName(name: string): Promise<ApiResponse> {
    try {
      const role = await this.roleRepository.findByName(name);
      return new ApiResponse('Success', role, '200');
    } catch (err) {
      return new ApiResponse('Failed', err, '400');
    }
  }

  async updateById(id: number, dto: UpdateRoleDto): Promise<ApiResponse> {
    try {
      const role = await this.roleRepository.updateById(id, dto);
      return new ApiResponse('Success', role, '200');
    } catch (err) {
      return new ApiResponse('Failed', err, '400');
    }
  }

  async deleteById(id: number): Promise<ApiResponse> {
    try {
      const result = await this.roleRepository.deleteById(id);
      return new ApiResponse('Success', result, '200');
    } catch (err) {
      return new ApiResponse('Failed', err, '400');
    }
  }
}
