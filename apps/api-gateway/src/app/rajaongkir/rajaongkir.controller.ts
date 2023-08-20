import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RajaongkirService } from './rajaongkir.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '@myexperiment/auth-guard';
import { OngkosDto } from '@myexperiment/domain';

@ApiTags('Raja-ongkir')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('rajaongkir')
export class RajaongkirController {
  constructor(private rajaOngkirService: RajaongkirService) {}

  @Get()
  async getProvinci() {
    return this.rajaOngkirService.getProvinsi();
  }

  @Get('/kota/:provId')
  async getCity(@Param('provId') provId: number) {
    return this.rajaOngkirService.getCity(provId);
  }

  @Post('/cost')
  async getOngkos(@Body() ongkosDto: OngkosDto) {
    return this.rajaOngkirService.getOngkos(ongkosDto);
  }
}
