import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { CartItem } from '../../carts/entities/cart-item.entity';
import { OrderItem } from '../../orders/entities/order-item.entity';
import { Review } from '../../reviews/entities/review.entity';

@Entity({ name: 'products' })
export class Product {
  @ApiProperty({
    example: '22222222-2222-2222-2222-222222222222',
    description: 'UUID cua san pham',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({
    example: '11111111-1111-1111-1111-111111111111',
    description: 'UUID cua danh muc',
  })
  @Index()
  @Column({ type: 'uuid' })
  category_id!: string;

  @ApiProperty({
    type: () => Category,
    description: 'Thong tin danh muc',
  })
  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'RESTRICT',
  })
  category!: Category;

  @ApiProperty({
    example: 'Tra gung',
    description: 'Ten san pham',
  })
  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @ApiPropertyOptional({
    example: 'San pham ho tro lam am co the',
    description: 'Mo ta san pham',
    nullable: true,
  })
  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @ApiProperty({
    example: '120000.00',
    description: 'Gia san pham',
  })
  @Column({ type: 'numeric', precision: 12, scale: 2 })
  price!: string;

  @ApiProperty({
    example: 25,
    description: 'So luong ton kho',
  })
  @Column({ type: 'int', default: 0 })
  stock!: number;

  @ApiPropertyOptional({
    example: 'https://example.com/images/tra-gung.jpg',
    description: 'URL anh san pham',
    nullable: true,
  })
  @Column({ type: 'varchar', length: 1024, nullable: true })
  image!: string | null;

  @ApiProperty({
    example: '2026-06-04T10:00:00.000Z',
    description: 'Thoi gian tao',
  })
  @CreateDateColumn({ type: 'timestamptz' })
  created_at!: Date;

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cart_items!: CartItem[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  order_items!: OrderItem[];

  @OneToMany(() => Review, (review) => review.product)
  reviews!: Review[];
}
