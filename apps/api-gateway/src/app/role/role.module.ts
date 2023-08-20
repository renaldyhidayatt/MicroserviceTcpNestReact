import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [ConfigModule],
  providers: [
    RoleService,
    {
      provide: 'ROLE_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('ROLE_SERVICE_HOST'),
            port: configService.get('ROLE_SERVICE_PORT'),
          },
        });
      },
    },
  ],
  controllers: [RoleController],
})
export class RoleModule {}
