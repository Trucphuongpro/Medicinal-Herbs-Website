import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';
import { UserRole } from '../enum/enum.userrole';

export class CreateUserDto {
  @IsNotEmpty()
  full_name!: string;

  @IsEmail()
  email!: string;

  @MinLength(6)
  password!: string;

  @IsOptional()
  @IsIn([UserRole.ADMIN, UserRole.USER])
  role?: UserRole;
}
