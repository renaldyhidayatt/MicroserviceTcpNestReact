import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { CartModule } from '@myexperiment/infrastructure';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart, Role, User } from '@myexperiment/domain';

@Module({
  imports: [
    CartModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [User, Role, Cart],
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
