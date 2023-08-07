import { MidtransDto } from '@myexperiment/domain';
import { Body, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class MidtransService {
  constructor(
    @Inject('MIDTRANS_SERVICE') private midtransClient: ClientProxy
  ) {}

  async createTransaction(@Body() dto: MidtransDto) {
    return this.midtransClient.send({ cmd: 'transaction' }, dto);
  }
}
