import { CreateRoleDto, Role, UpdateRoleDto } from '@myexperiment/domain';

export interface IRoleRepository {
  findAll(): Promise<Role[]>;
  findById(id: number): Promise<Role>;
  createRole(dto: CreateRoleDto): Promise<Role>;
  findByName(name: string): Promise<Role>;
  updateById(id: number, dto: UpdateRoleDto): Promise<Role>;
  deleteById(id: number): Promise<any>;
}
