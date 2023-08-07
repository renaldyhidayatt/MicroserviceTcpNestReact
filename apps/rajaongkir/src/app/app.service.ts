import { Injectable } from '@nestjs/common';
import { RajaOngkirAPI } from './utils/raja_ongkirt';

@Injectable()
export class AppService {
  private rajaOngkir: RajaOngkirAPI;

  constructor() {
    this.rajaOngkir = new RajaOngkirAPI();
  }

  async getProvinsi() {
    try {
      const rajaOngkirInstance = this.rajaOngkir.getInstance();
      const response = await rajaOngkirInstance.get('/province');
      return response.data;
    } catch (error) {
      throw new Error(
        'Failed to fetch province data from RajaOngkir API' + error
      );
    }
  }

  async getCity(id_prov: number) {
    try {
      const rajaOngkirInstance = this.rajaOngkir.getInstance();

      const response = await rajaOngkirInstance.get(
        `/city?province=${id_prov}`
      );

      return response.data;
    } catch (err) {
      throw new Error('Failed to fetch city data from RajaOngkir API');
    }
  }

  async getCost(asal: string, tujuan: string, berat: number, courier: string) {
    try {
      const rajaOngkirInstance = this.rajaOngkir.getInstance();
      const response = await rajaOngkirInstance.post('/cost', {
        origin: asal,
        destination: tujuan,
        weight: berat,
        courier: courier,
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to get shipping cost from RajaOngkir API');
    }
  }
}
