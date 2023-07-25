import { CreateUserDto, UpdateUserDto, User } from '@myexperiment/domain';

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User>;
  create(dto: CreateUserDto): Promise<User>;
  updateById(id: number, dto: UpdateUserDto, file: string): Promise<User>;
  deleteById(id: number): Promise<any>;
}
