import { OngkosDto } from '@myexperiment/domain';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RajaongkirService {
  constructor(@Inject('RAJA_ONGKIR_SERVICE') private rajaClient: ClientProxy) {}

  async getProvinsi(): Promise<any> {
    return this.rajaClient.send({ cmd: 'provinsi' }, {});
  }

  async getCity(provId: number) {
    return this.rajaClient.send({ cmd: 'city' }, provId);
  }

  async getOngkos(ongkosDto: OngkosDto) {
    return this.rajaClient.send({ cmd: 'cost' }, ongkosDto);
  }
}
