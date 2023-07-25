import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Slider } from '@myexperiment/domain';
import { SliderService } from './service';
import { SliderRepository } from './repository';

@Module({
  imports: [TypeOrmModule.forFeature([Slider])],
  providers: [SliderService, SliderRepository],
  exports: [SliderService, SliderRepository],
})
export class SliderModule {}
