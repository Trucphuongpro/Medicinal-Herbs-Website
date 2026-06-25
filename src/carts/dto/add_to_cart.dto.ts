import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsUUID, Min } from 'class-validator';

export class AddToCartDto {
  @ApiProperty({
    example: '22222222-2222-2222-2222-222222222222',
    description: 'UUID cua san pham',
  })
  @IsUUID()
  productId: string;

  @ApiProperty({
    example: 2,
    minimum: 1,
    description: 'So luong san pham muon them',
  })
  @IsInt()
  @Min(1)
  quantity: number;
}
