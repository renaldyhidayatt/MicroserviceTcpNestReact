import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  providers: [
    CartService,
    {
      provide: 'CART_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('CART_SERVICE_HOST'),
            port: configService.get('CART_SERVICE_PORT'),
          },
        });
      },
    },
  ],
  controllers: [CartController],
})
export class CartModule {}
