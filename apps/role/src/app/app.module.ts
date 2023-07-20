import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '@myexperiment/domain';
import {
  RoleModule,
  RoleRepository,
  RoleService,
} from '@myexperiment/infrastructure';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Role],
      synchronize: true,
    }),
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService, RoleService],
})
export class AppModule {}
