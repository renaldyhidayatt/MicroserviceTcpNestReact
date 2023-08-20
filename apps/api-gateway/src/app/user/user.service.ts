import { CreateUserDto, UpdateUserDto } from '@myexperiment/domain';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CloudinaryService } from 'libs/infrastructure/src/lib/cloudinary/service';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE') private userClient: ClientProxy,
    private cloudinaryService: CloudinaryService
  ) {}

  async findAll() {
    return this.userClient.send({ cmd: 'get_users' }, {});
  }

  async findById(id: number) {
    return this.userClient.send({ cmd: 'get_user' }, id);
  }

  async createUser(dto: CreateUserDto) {
    return this.userClient.send({ cmd: 'create_user' }, dto);
  }

  async updateUser(id: number, dto: UpdateUserDto, file: Express.Multer.File) {
    const uploadResult = await this.cloudinaryService.uploadFile(file);

    dto.file = uploadResult.secure_url;

    return this.userClient.send(
      { cmd: 'update_user' },
      { id, updateUser: dto }
    );
  }

  async deleteUser(id: number) {
    return this.userClient.send({ cmd: 'delete_user' }, id);
  }
}
