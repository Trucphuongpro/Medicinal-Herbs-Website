import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReviewDto {
  @ApiProperty({
    example: '22222222-2222-2222-2222-222222222222',
    description: 'UUID của sản phẩm',
  })
  @IsUUID()
  productId!: string;

  @ApiProperty({
    example: 5,
    minimum: 1,
    maximum: 5,
    description: 'Số sao đánh giá từ 1 đến 5',
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(5)
  rating!: number;

  @ApiPropertyOptional({
    example: 'Sản phẩm rất tốt, giao hàng nhanh',
    description: 'Nhận xét của người dùng',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  comment?: string;
}
