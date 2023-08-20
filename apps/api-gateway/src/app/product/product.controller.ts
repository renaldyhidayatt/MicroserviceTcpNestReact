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
import { ProductService } from './product.service';
import {
  CartDto,
  CreateProductDto,
  UpdateProductDto,
} from '@myexperiment/domain';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard, RoleGuard } from '@myexperiment/auth-guard';

@ApiTags('Product')
@ApiBearerAuth()
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'find all product' })
  findAll(): Promise<any> {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'find by id product' })
  findById(@Param('id') id: number): Promise<any> {
    return this.productService.findById(id);
  }

  @Get('/slug/:slug')
  @ApiOperation({ summary: 'find by slug product' })
  findBySlug(@Param('slug') slug: string): Promise<any> {
    return this.productService.findBySlug(slug);
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Post('/create')
  @ApiOperation({ summary: 'create product' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createProduct: CreateProductDto,
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
    return this.productService.createProduct(createProduct, file);
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Put('/:id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'update product' })
  updateById(
    @Param('id') id: number,
    @Body() updateProduct: UpdateProductDto,
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
    return this.productService.updateProduct(id, updateProduct, file);
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Post('/updatequantity')
  updateQuantity(@Body('cart') cart: CartDto[]) {
    return this.productService.updateQuantity(cart);
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.productService.deleteProduct(id);
  }
}
