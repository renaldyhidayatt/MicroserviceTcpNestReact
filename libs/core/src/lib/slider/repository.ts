import { CreateSliderDto, Slider, UpdateSliderDto } from '@myexperiment/domain';

export interface ISliderRepository {
  findAll(): Promise<Slider[]>;
  findById(id: number): Promise<Slider>;
  createSlider(dto: CreateSliderDto, file: string): Promise<Slider>;
  updateSlider(id: number, dto: UpdateSliderDto, file: string): Promise<Slider>;
  deleteSlider(id: number): Promise<Slider>;
}
