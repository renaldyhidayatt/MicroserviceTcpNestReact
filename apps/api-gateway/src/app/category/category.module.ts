import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { CloudinaryModule } from '@myexperiment/infrastructure';

@Module({
  imports: [CloudinaryModule, ConfigModule.forRoot()],
  providers: [
    CategoryService,
    {
      provide: 'CATEGORY_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('CATEGORY_SERVICE_HOST'),
            port: configService.get('CATEGORY_SERVICE_PORT'),
          },
        });
      },
    },
  ],
  controllers: [CategoryController],
})
export class CategoryModule {}
