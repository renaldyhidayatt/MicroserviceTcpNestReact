import { IDashboardService } from '@myexperiment/core';
import { BadRequestException, Injectable } from '@nestjs/common';
import { DashboardRepository } from './repository';
import { ApiResponse } from '@myexperiment/domain';

@Injectable()
export class DashboardService implements IDashboardService {
  constructor(private readonly dashboardRepository: DashboardRepository) {}

  async dashboard(): Promise<ApiResponse> {
    try {
      const user = await this.dashboardRepository.countUser();
      const product = await this.dashboardRepository.countProduct();
      const order = await this.dashboardRepository.countOrder();
      const pendapatan = await this.calculateYearlyRevenue();
      const sumPendaptan = await this.dashboardRepository.sumPendapatan();

      return new ApiResponse(
        'Succes',
        { user, product, order, pendapatan, totalPendapatan: sumPendaptan },
        '200'
      );
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  private async calculateYearlyRevenue() {
    try {
      const monthlyRevenue: number[] = [];

      for (let month = 1; month <= 12; month++) {
        const revenue = await this.dashboardRepository.pendapatan(month);
        monthlyRevenue.push(revenue);
      }

      return monthlyRevenue;
    } catch (error) {
      throw new Error(`Failed to calculate yearly revenue: ${error}`);
    }
  }
}
