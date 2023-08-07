import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { RajaongkirService } from './rajaongkir.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '@myexperiment/auth-guard';

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

  @Get('/ongkos/:asal/:tujuan/:berat/:kurir')
  async getOngkos(
    @Param('asal') asal: string,
    @Param('tujuan') tujuan: string,
    @Param('berat') berat: number,
    @Param('kurir') kurir: string
  ) {
    return this.rajaOngkirService.getOngkos(asal, tujuan, berat, kurir);
  }
}
