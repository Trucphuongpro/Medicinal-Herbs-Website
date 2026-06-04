import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: '11111111-1111-1111-1111-111111111111',
    description: 'UUID cua danh muc',
  })
  @IsUUID()
  category_id!: string;

  @ApiProperty({
    example: 'Tra gung',
    maxLength: 255,
    description: 'Ten san pham',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name!: string;

  @ApiPropertyOptional({
    example: 'San pham ho tro lam am co the',
    description: 'Mo ta san pham',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 120000,
    minimum: 0,
    description: 'Gia san pham',
  })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price!: number;

  @ApiProperty({
    example: 25,
    minimum: 0,
    description: 'So luong ton kho',
  })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  stock!: number;

  @ApiPropertyOptional({
    example: 'https://example.com/images/tra-gung.jpg',
    maxLength: 1024,
    description: 'URL anh san pham',
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  @MaxLength(1024)
  image?: string;
}
