import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ required: true })
  @IsNumber()
  user_id: number;

  @ApiProperty({ required: true })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({ required: true })
  @IsString()
  postalCode: string;

  @ApiProperty({ required: true })
  @IsString()
  countryCode: string;

  @ApiProperty({ required: true })
  @IsString()
  totalProduct: string;

  @ApiProperty({ required: true })
  @IsNumber()
  totalPrice: number;
}
