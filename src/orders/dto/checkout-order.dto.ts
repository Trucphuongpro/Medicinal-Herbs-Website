import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { PaymentMethod } from '../entities/order.entity';
export class CheckoutOrderDto {
  @ApiProperty()
  @IsString()
  shipping_address!: string;

  @ApiProperty()
  @IsString()
  phone!: string;

  @ApiProperty({ enum: PaymentMethod })
  @IsEnum(PaymentMethod)
  payment_method!: PaymentMethod;
}
