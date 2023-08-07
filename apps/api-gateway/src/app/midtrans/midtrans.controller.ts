import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { MidtransService } from './midtrans.service';
import { MidtransDto } from '@myexperiment/domain';
import { JwtGuard } from '@myexperiment/auth-guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Midtrans')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('midtrans')
export class MidtransController {
  constructor(private midtransService: MidtransService) {}

  @Post('/transaction')
  async createTransaction(@Body() dto: MidtransDto) {
    return this.midtransService.createTransaction(dto);
  }
}
