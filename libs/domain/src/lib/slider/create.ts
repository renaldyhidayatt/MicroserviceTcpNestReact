import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSliderDto {
  @ApiProperty({ required: true })
  @IsString()
  nama: string;

  @ApiProperty({ required: true, type: 'string', format: 'binary' })
  file: any;
}
