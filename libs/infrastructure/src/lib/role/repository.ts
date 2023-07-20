import { IRoleRepository } from '@myexperiment/core';
import { CreateRoleDto, Role, UpdateRoleDto } from '@myexperiment/domain';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class RoleRepository implements IRoleRepository {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>
  ) {}
  async findAll(): Promise<Role[]> {
    try {
      const role = this.roleRepository.find();

      return role;
    } catch (e) {
      throw new Error('Failed message ' + e);
    }
  }

  async findById(id: number): Promise<Role> {
    try {
      const role = this.roleRepository.findOne({ where: { role_id: id } });

      return role;
    } catch (err) {
      throw new Error('Failed message ' + err);
    }
  }

  async createRole(dto: CreateRoleDto): Promise<Role> {
    try {
      if (await this.findByName(dto.role)) {
        throw new Error('Failed name already exitst');
      }

      const createRole = this.roleRepository.create({
        role: dto.role,
      });

      const savedRole = await this.roleRepository.save(createRole);

      return savedRole;
    } catch (err) {
      throw new Error('Failed message ' + err);
    }
  }

  async findByName(name: string): Promise<Role> {
    try {
      const role = this.roleRepository.findOne({ where: { role: name } });

      return role;
    } catch (err) {
      throw new Error('Failed message ' + err);
    }
  }

  async updateById(id: number, dto: UpdateRoleDto) {
    try {
      const updateRole = await this.findById(id);
      if (updateRole == null) {
        throw new Error('Failed id not found');
      }

      updateRole.role = dto.role;

      const role = await this.roleRepository.save(updateRole);

      return role;
    } catch (err) {
      throw new Error('Failed message ' + err);
    }
  }

  async deleteById(id: number): Promise<any> {
    try {
      const deleteRole = await this.findById(id);
      if (deleteRole == null) {
        throw new Error('Failed id not found');
      }

      const role = await this.roleRepository.remove(deleteRole);

      return role;
    } catch (err) {
      throw new Error('Failed message ' + err);
    }
  }
}
