import { ISliderService } from '@myexperiment/core';
import { BadRequestException, Injectable } from '@nestjs/common';
import { SliderRepository } from './repository';
import {
  ApiResponse,
  CreateSliderDto,
  UpdateSliderDto,
} from '@myexperiment/domain';

@Injectable()
export class SliderService implements ISliderService {
  constructor(private readonly sliderRepository: SliderRepository) {}

  async findAll(): Promise<ApiResponse> {
    try {
      const slider = await this.sliderRepository.findAll();
      return new ApiResponse('Succes', slider, '200');
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async findById(id: number): Promise<ApiResponse> {
    try {
      const slider = await this.sliderRepository.findById(id);

      return new ApiResponse('Succes', slider, '200');
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async createSlider(
    dto: CreateSliderDto,
    file: Express.Multer.File
  ): Promise<ApiResponse> {
    try {
      const createSlider = this.sliderRepository.createSlider(dto, file.path);

      return new ApiResponse('Succes', createSlider, '200');
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async updateSlider(
    id: number,
    dto: UpdateSliderDto,
    file: Express.Multer.File
  ): Promise<ApiResponse> {
    try {
      const updateSlider = await this.sliderRepository.updateSlider(
        id,
        dto,
        file.path
      );

      return new ApiResponse('Succes', updateSlider, '200');
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async deleteSlider(id: number): Promise<ApiResponse> {
    try {
      const deleteSlider = this.sliderRepository.deleteSlider(id);

      return new ApiResponse('Succes', deleteSlider, '200');
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
