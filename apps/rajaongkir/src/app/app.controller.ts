import { Controller } from '@nestjs/common';

import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

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
  async getOngkos(asal: string, tujuan: string, berat: number, kurir: string) {
    return this.appService.getCost(asal, tujuan, berat, kurir);
  }
}
