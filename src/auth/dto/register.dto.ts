import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
export class RegisterDto {
  @IsOptional()
  fullname?: string;

  @IsNotEmpty()
  @Transform(({ value, obj }) => value ?? obj?.fullname)
  full_name!: string;

  @IsEmail()
  email!: string;

  @MinLength(6)
  password!: string;
}
