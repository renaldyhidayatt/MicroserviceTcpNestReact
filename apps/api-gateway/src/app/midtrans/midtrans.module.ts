import { Module } from '@nestjs/common';
import { MidtransService } from './midtrans.service';
import { MidtransController } from './midtrans.controller';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  providers: [
    MidtransService,
    {
      provide: 'MIDTRANS_SERVICe',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('MIDTRANS_SERVICE_HOST'),
            port: configService.get('MIDTRANS_SERVICE_PORT'),
          },
        });
      },
    },
  ],
  controllers: [MidtransController],
})
export class MidtransModule {}
