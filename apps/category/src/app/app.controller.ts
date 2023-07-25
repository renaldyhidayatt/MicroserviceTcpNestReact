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
  CreateCategoryDto,
  UpdateCategoryDto,
} from '@myexperiment/domain';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { CategoryService } from '@myexperiment/infrastructure';

@Controller()
export class AppController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAll(): Promise<ApiResponse> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<ApiResponse> {
    return this.categoryService.findById(id);
  }

  @Get('/slug/:slug')
  findBySlug(@Param('slug') slug: string): Promise<ApiResponse> {
    return this.categoryService.findBySlug(slug);
  }

  @Post('/create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createCategory: CreateCategoryDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],
      })
    )
    file: Express.Multer.File
  ): Promise<ApiResponse> {
    return this.categoryService.createCategory(createCategory, file);
  }

  @Put('/:id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  updateById(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],
      })
    )
    file: Express.Multer.File
  ): Promise<ApiResponse> {
    return this.categoryService.updateCategory(id, updateCategoryDto, file);
  }

  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.categoryService.deleteCategory(id);
  }
}
