import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { CartModule } from '@myexperiment/infrastructure';

@Module({
  imports: [CartModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
