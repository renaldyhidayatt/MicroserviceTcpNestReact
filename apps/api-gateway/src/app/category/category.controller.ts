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
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from '@myexperiment/domain';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard, RoleDecorator, RoleGuard } from '@myexperiment/auth-guard';

@ApiTags('Category')
@ApiBearerAuth()
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAll(): Promise<any> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<any> {
    return this.categoryService.findById(id);
  }

  @Get('/slug/:slug')
  findBySlug(@Param('slug') slug: string): Promise<any> {
    return this.categoryService.findBySlug(slug);
  }

  @UseGuards(JwtGuard, RoleGuard)
  @ApiOperation({ summary: 'create category' })
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
  ): Promise<any> {
    return this.categoryService.createCategory(createCategory, file);
  }

  @UseGuards(JwtGuard, RoleGuard)
  @ApiOperation({ summary: 'update category' })
  @ApiConsumes('multipart/form-data')
  @Put('/:id')
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
  ): Promise<any> {
    return this.categoryService.updateCategory(id, updateCategoryDto, file);
  }

  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.categoryService.deleteCategory(id);
  }
}
