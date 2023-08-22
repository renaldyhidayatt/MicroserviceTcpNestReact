import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { Cart, Category, Order, Product, User } from '@myexperiment/domain';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardModule } from '@myexperiment/infrastructure';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Order, Product, Category, Cart],
      synchronize: true,
      autoLoadEntities: true,
    }),
    DashboardModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
