import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ required: true })
  @IsString()
  firstname: string;

  @ApiProperty({ required: true })
  @IsString()
  lastname: string;

  @ApiProperty({ required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ required: true })
  @IsNumber()
  role: number;

  @ApiProperty({ required: true, type: 'string', format: 'binary' }) // Specify the type as 'string' and format as 'binary' for the file
  file: any;

  @ApiProperty({ required: true })
  @IsString()
  @Length(6, 20)
  password: string;
}
