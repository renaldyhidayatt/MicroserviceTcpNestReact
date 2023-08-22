import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { CloudinaryModule } from '@myexperiment/infrastructure';

@Module({
  imports: [CloudinaryModule, ConfigModule],
  providers: [
    DashboardService,
    {
      provide: 'DASHBOARD_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('DASHBOARD_SERVICE_HOST'),
            port: configService.get('DASHBOARD_SERVICE_PORT'),
          },
        });
      },
    },
  ],
  controllers: [DashboardController],
})
export class CategoryModule {}
