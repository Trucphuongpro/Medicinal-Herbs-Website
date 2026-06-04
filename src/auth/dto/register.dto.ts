import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class RegisterDto {
  @ApiProperty({})
  @IsOptional()
  @IsNotEmpty()
  fullname?: string;

  @ApiProperty({})
  @IsEmail()
  email!: string;

  @ApiProperty({})
  @MinLength(6)
  password!: string;
}
