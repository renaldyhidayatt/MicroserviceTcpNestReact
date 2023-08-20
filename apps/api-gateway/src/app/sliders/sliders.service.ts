import { CreateSliderDto, UpdateSliderDto } from '@myexperiment/domain';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CloudinaryService } from 'libs/infrastructure/src/lib/cloudinary/service';

@Injectable()
export class SlidersService {
  constructor(
    @Inject('SLIDER_SERVICE') private sliderClient: ClientProxy,
    private cloudinaryService: CloudinaryService
  ) {}

  async findAll() {
    return this.sliderClient.send({ cmd: 'get_sliders' }, {});
  }

  async findById(id: number) {
    return this.sliderClient.send({ cmd: 'get_slider' }, id);
  }

  async createSliders(dto: CreateSliderDto, file: Express.Multer.File) {
    const uploadResult = await this.cloudinaryService.uploadFile(file);

    dto.file = uploadResult.secure_url;
    return this.sliderClient.send({ cmd: 'create_slider' }, dto);
  }

  async updateSliders(
    id: number,
    dto: UpdateSliderDto,
    file: Express.Multer.File
  ) {
    if (isNaN(id) || !Number.isInteger(Number(id))) {
      throw new BadRequestException('Invalid ID. ID must be an integer.');
    }

    const uploadResult = await this.cloudinaryService.uploadFile(file);

    dto.file = uploadResult.secure_url;

    return this.sliderClient.send(
      { cmd: 'update_slider' },
      { id: id, updateSlider: dto }
    );
  }

  async deleteSlider(id: number) {
    return this.sliderClient.send({ cmd: 'delete_slider' }, id);
  }
}
