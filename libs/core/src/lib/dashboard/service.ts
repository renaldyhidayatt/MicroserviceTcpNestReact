import { ApiResponse } from '@myexperiment/domain';

export interface IDashboardService {
  dashboard(): Promise<ApiResponse>;
}
