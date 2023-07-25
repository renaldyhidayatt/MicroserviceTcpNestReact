import { IAuthRepository } from '@myexperiment/core';
import { CreateUserDto, User } from '@myexperiment/domain';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleRepository } from '../role';
import { PasswordHash } from '../utils';

export class AuthRepository implements IAuthRepository {
  constructor(
    private roleRepository: RoleRepository,
    @InjectRepository(User) private authRepository: Repository<User>
  ) {}

  async findByEmail(email: string): Promise<User> {
    try {
      const user = this.authRepository
        .createQueryBuilder('user')
        .where('user.email = :email', { email: email })
        .leftJoinAndSelect('user.role', 'role')
        .getOne();

      if (!user) {
        throw new Error('Error Email not defined');
      }

      return user;
    } catch (err) {
      throw new Error('Failed message ' + err);
    }
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    try {
      if ((await this.findByEmail(dto.email)) != null) {
        throw new Error('Failed email already');
      }
      const role = await this.roleRepository.findById(1);
      const password = new PasswordHash();

      const passwordHash = await password.hashPassword(dto.password);

      const createUser = this.authRepository.create({
        email: dto.email,
        password: passwordHash,
        firstname: dto.firstname,
        lastname: dto.lastname,
        role: role,
      });

      const savedUser = await this.authRepository.save(createUser);

      return savedUser;
    } catch (err) {
      throw new Error('Failed message ' + err);
    }
  }

  async findById(id: number): Promise<User> {
    try {
      const user = this.authRepository
        .createQueryBuilder('user')
        .where('user.user_id = :id', { id })
        .select([
          'user.user_id',
          'user.firstname',
          'user.lastname',
          'user.email',
          'user.password',
        ])
        .leftJoinAndSelect('user.role', 'role')
        .getOne();

      return user;
    } catch (err) {
      throw new Error('Failed message ' + err);
    }
  }
}
