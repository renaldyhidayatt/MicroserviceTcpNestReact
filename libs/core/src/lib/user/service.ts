import {
  ApiResponse,
  CreateUserDto,
  UpdateUserDto,
} from '@myexperiment/domain';

export interface IUserService {
  getAllUsers(): Promise<ApiResponse>;
  getUserById(id: number): Promise<ApiResponse>;
  createUser(dto: CreateUserDto): Promise<ApiResponse>;
  updateUserById(
    id: number,
    dto: UpdateUserDto,
    file: Express.Multer.File
  ): Promise<ApiResponse>;
  deleteUserById(id: number): Promise<ApiResponse>;
}
