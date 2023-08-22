import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class DashboardService {
  constructor(
    @Inject('DASHBOARD_SERVICE') private dashboardClient: ClientProxy
  ) {}

  async dashboard() {
    return this.dashboardClient.send({ cmd: 'get_dashboard' }, {});
  }
}
