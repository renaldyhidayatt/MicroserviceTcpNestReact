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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from '@myexperiment/domain';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard, RoleGuard } from '@myexperiment/auth-guard';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
@UseGuards(JwtGuard, RoleGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/create')
  async createUser(@Body() createUser: CreateUserDto): Promise<any> {
    return await this.userService.createUser(createUser);
  }

  @Get()
  async getAllUsers(): Promise<any> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<any> {
    return await this.userService.findById(id);
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
    updateUser.file = file.path;
    return this.userService.updateUser(id, updateUser);
  }

  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
