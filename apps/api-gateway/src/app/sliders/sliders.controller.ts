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

import { SlidersService } from './sliders.service';
import { CreateSliderDto, UpdateSliderDto } from '@myexperiment/domain';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard, RoleGuard } from '@myexperiment/auth-guard';

@ApiTags('Slider')
@ApiBearerAuth()
@Controller('sliders')
export class SlidersController {
  constructor(private sliderService: SlidersService) {}

  @Get()
  findAll(): Promise<any> {
    return this.sliderService.findAll();
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Get('/:id')
  findById(@Param('id') id: number): Promise<any> {
    return this.sliderService.findById(id);
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Post('/create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createSlider: CreateSliderDto,
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
    return this.sliderService.createSliders(createSlider, file);
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Put('/:id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  updateById(
    @Param('id') id: number,
    @Body() updateSlider: UpdateSliderDto,
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
    updateSlider.file = file.path;
    return this.sliderService.updateSliders(id, updateSlider, file);
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.sliderService.deleteSlider(id);
  }
}
