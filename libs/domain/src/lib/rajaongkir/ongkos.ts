import { IsNumber, IsString } from 'class-validator';

export class OngkosDto {
  @IsString()
  asal: string;

  @IsString()
  tujuan: string;

  @IsNumber()
  berat: number;

  @IsString()
  kurir: string;
}
