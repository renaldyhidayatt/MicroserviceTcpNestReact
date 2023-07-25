import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import {
  ApiResponse,
  CreateUserDto,
  UpdateUserDto,
} from '@myexperiment/domain';
import { ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from '@myexperiment/infrastructure';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  async createUser(@Body() createUser: CreateUserDto): Promise<ApiResponse> {
    return await this.userService.createUser(createUser);
  }

  @Get()
  async getAllUsers(): Promise<ApiResponse> {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<ApiResponse> {
    return await this.userService.getUserById(id);
  }

  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  updateById(
    @Param('id') id: number,
    @Body() updateUser: UpdateUserDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],
      })
    )
    file: Express.Multer.File
  ) {
    return this.userService.updateUserById(id, updateUser, file);
  }

  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.userService.deleteUserById(id);
  }
}
