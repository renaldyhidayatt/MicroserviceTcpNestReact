import { Module } from '@nestjs/common';
import { SlidersService } from './sliders.service';
import { SlidersController } from './sliders.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { CloudinaryModule } from '@myexperiment/infrastructure';

@Module({
  imports: [ConfigModule, CloudinaryModule],
  providers: [
    SlidersService,
    {
      provide: 'SLIDER_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('SLIDER_SERVICE_HOST'),
            port: configService.get('SLIDER_SERVICE_PORT'),
          },
        });
      },
    },
  ],
  controllers: [SlidersController],
})
export class SlidersModule {}
