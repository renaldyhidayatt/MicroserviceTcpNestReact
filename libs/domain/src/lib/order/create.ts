import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty({ required: true })
  @IsString()
  nama: string;

  @ApiProperty({ required: true })
  @IsString()
  phone: string;

  @ApiProperty({ required: true })
  @IsString()
  provinsi: string;

  @ApiProperty({ required: true })
  @IsString()
  kota: string;

  @ApiProperty({ required: true })
  @IsString()
  alamat: string;

  @ApiProperty({ required: true })
  @IsString()
  kurir: string;

  @ApiProperty({ required: true })
  @IsString()
  shippingMethod: string;

  @ApiProperty({ required: true })
  @IsNumber()
  shippingCost: number;

  @ApiProperty({ required: true })
  @IsString()
  totalProduct: string;

  @ApiProperty({ required: true })
  @IsNumber()
  totalPrice: number;
}
