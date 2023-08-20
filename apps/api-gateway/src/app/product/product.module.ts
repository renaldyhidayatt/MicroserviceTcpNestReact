import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { CloudinaryModule } from '@myexperiment/infrastructure';

@Module({
  imports: [
    ConfigModule,
    CloudinaryModule,
    // MulterModule.register({
    //   storage: diskStorage({
    //     destination: './public/upload/product',
    //     filename: (req, file, cb) => {
    //       const randomName = Array(32)
    //         .fill(null)
    //         .map(() => Math.round(Math.random() * 16).toString(16))
    //         .join('');
    //       return cb(null, `${randomName}${extname(file.originalname)}`);
    //     },
    //   }),
    // }),
  ],
  providers: [
    ProductService,
    {
      provide: 'PRODUCT_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('PRODUCT_SERVICE_HOST'),
            port: configService.get('PRODUCT_SERVICE_PORT'),
          },
        });
      },
    },
  ],
  controllers: [ProductController],
})
export class ProductModule {}
