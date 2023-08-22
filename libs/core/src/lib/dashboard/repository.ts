export interface IDashboardRepository {
  pendapatan(month: number): Promise<number>;
  sumPendapatan(): Promise<number>;
  countUser(): Promise<number>;
  countOrder(): Promise<number>;
  countProduct(): Promise<number>;
}
