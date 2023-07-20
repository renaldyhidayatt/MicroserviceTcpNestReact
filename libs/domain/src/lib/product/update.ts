import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({ required: true })
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsNumber()
  category_id: number;

  @ApiProperty({ required: true })
  @IsString()
  description: string;

  @ApiProperty({ required: true })
  @IsNumber()
  price: number;

  @ApiProperty({ required: true })
  @IsNumber()
  countInStock: number;

  @ApiProperty({ required: true, type: 'string', format: 'binary' })
  file: any;
}
