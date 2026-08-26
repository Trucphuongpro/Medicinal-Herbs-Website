import {
  JoinColumn,
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../../products/entities/product.entity';

@Entity({ name: 'order_items' })
@Unique('uq_order_items_order_product', ['order_id', 'product_id'])
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index()
  @Column({ type: 'uuid' })
  order_id!: string;

  @Index()
  @Column({ type: 'uuid' })
  product_id!: string;

  @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order!: Order;

  @ManyToOne(() => Product, (product) => product.order_items, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'product_id' })
  product!: Product;

  @Column({ type: 'int' })
  quantity!: number;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  price!: string;
}
