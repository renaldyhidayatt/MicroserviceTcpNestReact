import axios, { AxiosInstance } from 'axios';

export class RajaOngkirAPI {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: 'https://api.rajaongkir.com/starter',
    });
    this.instance.defaults.headers.common['key'] = process.env.RAJA_ONGKIR_KEY;
    this.instance.defaults.headers.post['Content-Type'] =
      'application/x-www-form-urlencoded';
  }

  getInstance(): AxiosInstance {
    return this.instance;
  }
}
