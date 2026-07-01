import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class CheckoutOrderDto {
  @ApiProperty()
  @IsString()
  shipping_address!: string;

  @ApiProperty()
  @IsString()
  phone!: string;

  @ApiProperty()
  @IsString()
  payment_method!: string;
}
