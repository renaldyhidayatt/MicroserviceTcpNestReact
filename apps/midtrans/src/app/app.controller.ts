import { Body, Controller } from '@nestjs/common';

import { AppService } from './app.service';
import { MidtransDto } from '@myexperiment/domain';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'transaction' })
  async createTransaction(@Body() dto: MidtransDto) {
    return this.appService.createTransaction(dto);
  }
}
