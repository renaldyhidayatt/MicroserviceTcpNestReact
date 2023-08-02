import { ISliderRepository } from '@myexperiment/core';
import { CreateSliderDto, Slider, UpdateSliderDto } from '@myexperiment/domain';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';

export class SliderRepository implements ISliderRepository {
  constructor(
    @InjectRepository(Slider) private sliderRepository: Repository<Slider>
  ) {}

  async findAll(): Promise<Slider[]> {
    try {
      const slider = this.sliderRepository.find();

      return slider;
    } catch (err) {
      throw new Error('Failed message ' + err);
    }
  }

  async findById(id: number): Promise<Slider> {
    try {
      const slider = this.sliderRepository.findOne({
        where: {
          slider_id: id,
        },
      });

      return slider;
    } catch (err) {
      throw new Error('Failed message ' + err);
    }
  }

  async createSlider(dto: CreateSliderDto): Promise<Slider> {
    try {
      const createSlider = this.sliderRepository.create({
        nama: dto.nama,
        image: dto.file,
      });

      const saved = await this.sliderRepository.save(createSlider);

      return saved;
    } catch (err) {
      throw new Error('Failed message: ' + err);
    }
  }

  async updateSlider(id: number, dto: UpdateSliderDto): Promise<Slider> {
    try {
      const findById = await this.findById(id);

      if (findById == null) {
        throw new Error('Failed not found slider');
      }

      if (findById.image) {
        fs.unlinkSync(findById.image);
      }

      findById.nama = dto.nama;
      findById.image = dto.file;

      const sliderUpdate = await this.sliderRepository.save(findById);

      return sliderUpdate;
    } catch (err) {
      throw new Error('Faield message: ' + err);
    }
  }

  async deleteSlider(id: number): Promise<Slider> {
    try {
      const sliderById = await this.findById(id);

      if (sliderById == null) {
        throw new Error('Failed not found slider');
      }

      if (sliderById.image) {
        fs.unlinkSync(sliderById.image);
      }

      return await this.sliderRepository.remove(sliderById);
    } catch (err) {
      throw new Error('Failed message: ' + err);
    }
  }
}
