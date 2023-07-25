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

import { ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiResponse,
  CreateSliderDto,
  UpdateSliderDto,
} from '@myexperiment/domain';
import { JwtGuard } from '@myexperiment/auth-guard';
import { SliderService } from '@myexperiment/infrastructure';

@Controller()
export class AppController {
  constructor(private sliderService: SliderService) {}

  @Get()
  findAll(): Promise<ApiResponse> {
    return this.sliderService.findAll();
  }

  @Get('/:id')
  findById(@Param('id') id: number): Promise<ApiResponse> {
    return this.sliderService.findById(id);
  }

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
  ): Promise<ApiResponse> {
    return this.sliderService.createSlider(createSlider, file);
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
    return this.sliderService.updateSlider(id, updateSlider, file);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  deleteById(@Param('id') id: number) {
    return this.sliderService.deleteSlider(id);
  }
}
