import {
  ApiResponse,
  CreateSliderDto,
  UpdateSliderDto,
} from '@myexperiment/domain';

export interface ISliderService {
  findAll(): Promise<ApiResponse>;
  findById(id: number): Promise<ApiResponse>;
  createSlider(
    dto: CreateSliderDto,
    file: Express.Multer.File
  ): Promise<ApiResponse>;
  updateSlider(
    id: number,
    dto: UpdateSliderDto,
    file: Express.Multer.File
  ): Promise<ApiResponse>;
  deleteSlider(id: number): Promise<ApiResponse>;
}
