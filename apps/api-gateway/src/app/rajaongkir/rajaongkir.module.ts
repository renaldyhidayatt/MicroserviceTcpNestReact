import { Module } from '@nestjs/common';
import { RajaongkirService } from './rajaongkir.service';
import { RajaongkirController } from './rajaongkir.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [ConfigModule],
  providers: [
    RajaongkirService,
    {
      provide: 'RAJA_ONGKIR_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('RAJA_ONGKIR_SERVICE_HOST'),
            port: configService.get('RAJA_ONGKIR_SERVICE_PORT'),
          },
        });
      },
    },
  ],
  controllers: [RajaongkirController],
})
export class RajaongkirModule {}
