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
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private sliderService: SliderService) {}

  @MessagePattern({ cmd: 'get_sliders' })
  findAll(): Promise<ApiResponse> {
    return this.sliderService.findAll();
  }

  @MessagePattern({ cmd: 'get_slider' })
  findById(@Param('id') id: number): Promise<ApiResponse> {
    return this.sliderService.findById(id);
  }

  @MessagePattern({ cmd: 'create_slider' })
  create(dto: CreateSliderDto): Promise<ApiResponse> {
    return this.sliderService.createSlider(dto);
  }

  @MessagePattern({ cmd: 'update_slider' })
  updateById(data: {
    id: number;
    updateSlider: UpdateSliderDto;
  }): Promise<any> {
    const { id, updateSlider } = data;

    return this.sliderService.updateSlider(id, updateSlider);
  }

  @MessagePattern({ cmd: 'delete_slider' })
  deleteById(id: number) {
    return this.sliderService.deleteSlider(id);
  }
}
