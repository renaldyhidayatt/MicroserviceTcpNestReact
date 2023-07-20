import { CreateUserDto, User } from '@myexperiment/domain';

export interface IAuthRepository {
  findByEmail(email: string): Promise<User>;
  createUser(dto: CreateUserDto): Promise<User>;
}
