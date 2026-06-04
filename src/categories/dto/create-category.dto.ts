import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Thao duoc',
    maxLength: 255,
    description: 'Ten danh muc san pham',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name!: string;
}
