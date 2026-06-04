import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity({ name: 'categories' })
export class Category {
  @ApiProperty({
    example: '11111111-1111-1111-1111-111111111111',
    description: 'UUID cua danh muc',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    example: 'Thao duoc',
    description: 'Ten danh muc',
  })
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 255, unique: true })
  name!: string;

  @ApiProperty({
    type: () => [Product],
    description: 'Danh sach san pham thuoc danh muc',
  })
  @OneToMany(() => Product, (product) => product.category)
  products!: Product[];
}
