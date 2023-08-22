import { JwtGuard, RoleGuard } from '@myexperiment/auth-guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';

@ApiTags('Admin')
@ApiBearerAuth()
@UseGuards(JwtGuard, RoleGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get('/')
  async dashboard(): Promise<any> {
    return this.dashboardService.dashboard();
  }
}
