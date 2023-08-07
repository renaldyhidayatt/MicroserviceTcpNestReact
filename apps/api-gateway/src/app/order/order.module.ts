import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [],
  providers: [
    OrderService,
    {
      provide: 'ORDER_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('ORDER_SERVICE_HOST'),
            port: configService.get('ORDER_SERVICE_PORT'),
          },
        });
      },
    },
  ],
  controllers: [OrderController],
})
export class OrderModule {}
