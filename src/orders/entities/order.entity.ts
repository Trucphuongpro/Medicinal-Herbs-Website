import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { OrderItem } from './order-item.entity';

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PAID = 'paid',
  SHIPPING = 'shipping',
  DELIVERED = 'delivered',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
}

export enum PaymentMethod {
  COD = 'cod',
  BANK_TRANSFER = 'bank_transfer',
  VNPAY = 'vnpay',
  MOMO = 'momo',
}

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index()
  @Column({ type: 'uuid' })
  user_id!: string;

  @ManyToOne(() => User, (user) => user.orders, { onDelete: 'RESTRICT' })
  user!: User;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  total_price!: string;

  @Column({ type: 'varchar', length: 30, default: OrderStatus.PENDING })
  status!: OrderStatus;

  @Column({ type: 'varchar', length: 50 })
  payment_method!: PaymentMethod;

  @Column({ type: 'text' })
  shipping_address!: string;

  @Column()
  phone!: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at!: Date;

  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true })
  items!: OrderItem[];
}
