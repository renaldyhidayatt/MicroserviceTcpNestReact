import { Controller, Get } from '@nestjs/common';

import { DashboardService } from '@myexperiment/infrastructure';
import { ApiResponse } from '@myexperiment/domain';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: DashboardService) {}

  @MessagePattern({ cmd: 'get_dashboard' })
  getData(): Promise<ApiResponse> {
    return this.appService.dashboard();
  }
}
