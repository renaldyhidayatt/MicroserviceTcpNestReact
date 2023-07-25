import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { CategoryModule } from '@myexperiment/infrastructure';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Product } from '@myexperiment/domain';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    CategoryModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Category, Product],
      synchronize: true,
      autoLoadEntities: true,
    }),
    MulterModule.register({
      storage: diskStorage({
        destination: './public/upload/category',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
