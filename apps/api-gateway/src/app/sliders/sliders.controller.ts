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
import { ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from '@myexperiment/auth-guard';

@Controller('sliders')
export class SlidersController {
  constructor(private sliderService: SlidersService) {}

  @Get()
  findAll(): Promise<any> {
    return this.sliderService.findAll();
  }

  @Get('/:id')
  findById(@Param('id') id: number): Promise<any> {
    return this.sliderService.findById(id);
  }

  @UseGuards(JwtGuard)
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
    createSlider.file = file.path;

    return this.sliderService.createSliders(createSlider);
  }

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
    return this.sliderService.updateSliders(id, updateSlider);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.sliderService.deleteSlider(id);
  }
}
