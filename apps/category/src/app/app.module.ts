import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { CategoryModule } from '@myexperiment/infrastructure';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Product } from '@myexperiment/domain';

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
  ],
  controllers: [AppController],
})
export class AppModule {}
