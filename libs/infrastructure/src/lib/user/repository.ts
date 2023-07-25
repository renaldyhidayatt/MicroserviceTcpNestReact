import { IUserRepository } from '@myexperiment/core';
import { CreateUserDto, UpdateUserDto, User } from '@myexperiment/domain';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { PasswordHash } from '../utils';
import { RoleRepository } from '../role';
import { Express } from 'express';

export class UserRepository implements IUserRepository {
  constructor(
    private roleRepository: RoleRepository,
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    try {
      const user = this.userRepository
        .createQueryBuilder('user')

        .select([
          'user.user_id',
          'user.firstname',
          'user.lastname',
          'user.email',
          'user.image',
        ])
        .leftJoinAndSelect('user.role', 'role')
        .getMany();

      return user;
    } catch (e) {
      throw new Error('Failed message ' + e);
    }
  }

  async findById(id: number): Promise<User> {
    try {
      const user = this.userRepository
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
    } catch (e) {
      throw new Error('Failed message ' + e);
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      const user = this.userRepository
        .createQueryBuilder('user')
        .where('user.email = :email', { email })
        .select([
          'user.user_id',
          'user.firstname',
          'user.lastname',
          'user.email',
          'user.password',
        ])
        .leftJoinAndSelect('user.role', 'role')
        .getOne();

      if (!user) {
        throw new Error('Error Email not defined');
      }

      return user;
    } catch (e) {
      throw new Error('Failed message ' + e);
    }
  }

  async create(user: CreateUserDto): Promise<User> {
    try {
      if ((await this.findByEmail(user.email)) != null) {
        throw new Error('Failed email already');
      }
      const passwordHashing = new PasswordHash();

      const role = await this.roleRepository.findById(1);

      const passwordHash = await passwordHashing.hashPassword(user.password);
      const createUser = this.userRepository.create({
        email: user.email,
        password: passwordHash,
        firstname: user.firstname,
        lastname: user.lastname,
        role: role,
      });

      const savedUser = await this.userRepository.save(createUser);

      return savedUser;
    } catch (e) {
      throw new Error('Failed message ' + e);
    }
  }

  async updateById(
    id: number,
    user: UpdateUserDto,
    file: string
  ): Promise<User> {
    try {
      const userById = await this.findById(id);
      if (userById == null) {
        throw new Error('Failed not found user');
      }

      let newPassword: string;

      const role = await this.roleRepository.findById(user.role);

      const passwordHash = new PasswordHash();

      if (user.password) {
        newPassword = await passwordHash.hashPassword(user.password);
      } else {
        newPassword = userById.password;
      }

      if (userById.image) {
        fs.unlinkSync(userById.image);
      }

      userById.email = user.email;
      userById.firstname = user.firstname;
      userById.lastname = user.lastname;
      userById.role = role;
      userById.password = newPassword;
      userById.image = file;

      const userUpdate = await this.userRepository.save(userById);

      return userUpdate;
    } catch (e) {
      throw new Error('Failed message ' + e);
    }
  }

  async deleteById(id: number): Promise<any> {
    try {
      const userById = await this.findById(id);
      if (userById == null) {
        throw new Error('Failed not found user');
      }

      if (userById.image) {
        fs.unlinkSync(userById.image);
      }

      return await this.userRepository.remove(userById);
    } catch (e) {
      throw new Error('Failed message ' + e);
    }
  }
}
