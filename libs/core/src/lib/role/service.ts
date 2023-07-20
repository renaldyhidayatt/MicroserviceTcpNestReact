import {
  ApiResponse,
  CreateRoleDto,
  Role,
  UpdateRoleDto,
} from '@myexperiment/domain';

export interface IRoleService {
  findAll(): Promise<ApiResponse>;
  findById(id: number): Promise<ApiResponse>;
  createRole(dto: CreateRoleDto): Promise<ApiResponse>;
  findByName(name: string): Promise<ApiResponse>;
  updateById(id: number, dto: UpdateRoleDto): Promise<ApiResponse>;
  deleteById(id: number): Promise<ApiResponse>;
}
