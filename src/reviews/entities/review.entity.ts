import {
  JoinColumn,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Product } from '../../products/entities/product.entity';

@Entity({ name: 'reviews' })
@Unique('uq_reviews_user_product', ['user_id', 'product_id'])
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid' })
  user_id: string;

  @Index()
  @Column({ type: 'uuid' })
  product_id: string;

  @ManyToOne(() => User, (user) => user.reviews, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Product, (product) => product.reviews, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ type: 'int' })
  rating: number;

  @Column({ type: 'text', nullable: true })
  comment: string | null;

  @Column({ type: 'boolean', default: false })
  is_hidden: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}
