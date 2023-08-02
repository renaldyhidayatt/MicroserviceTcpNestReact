import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order, User } from '@myexperiment/domain';
import { OrderModule, UserModule } from '@myexperiment/infrastructure';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Order],
      synchronize: true,
    }),
    OrderModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
