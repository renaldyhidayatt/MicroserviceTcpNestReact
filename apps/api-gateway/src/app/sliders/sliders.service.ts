import { CreateSliderDto, UpdateSliderDto } from '@myexperiment/domain';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class SlidersService {
  constructor(@Inject('SLIDER_SERVICE') private sliderClient: ClientProxy) {}

  async findAll() {
    return this.sliderClient.send({ cmd: 'get_sliders' }, {});
  }

  async findById(id: number) {
    return this.sliderClient.send({ cmd: 'get_slider' }, id);
  }

  async createSliders(dto: CreateSliderDto) {
    return this.sliderClient.send({ cmd: 'create_slider' }, dto);
  }

  async updateSliders(id: number, dto: UpdateSliderDto) {
    return this.sliderClient.send(
      { cmd: 'update_slider' },
      { id: id, dto: dto }
    );
  }

  async deleteSlider(id: number) {
    return this.sliderClient.send({ cmd: 'delete_slider' }, id);
  }
}
