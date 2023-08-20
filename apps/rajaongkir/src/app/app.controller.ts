import { Controller } from '@nestjs/common';

import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { OngkosDto } from '@myexperiment/domain';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'provinsi' })
  async getProvinci() {
    return this.appService.getProvinsi();
  }

  @MessagePattern({ cmd: 'city' })
  async getCity(provId: number) {
    return this.appService.getCity(provId);
  }

  @MessagePattern({ cmd: 'cost' })
  async getOngkos(ongkosDto: OngkosDto) {
    return this.appService.getCost(ongkosDto);
  }
}
