import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Cart } from './cart.entity';
import { Product } from '../../products/entities/product.entity';

@Entity({ name: 'cart_items' })
@Unique('uq_cart_items_cart_product', ['cart_id', 'product_id'])
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'uuid' })
  cart_id: string;

  @Index()
  @Column({ type: 'uuid' })
  product_id: string;

  @ManyToOne(() => Cart, (cart) => cart.items, { onDelete: 'CASCADE' })
  cart: Cart;

  @ManyToOne(() => Product, (product) => product.cart_items, { onDelete: 'RESTRICT' })
  product: Product;

  @Column({ type: 'int' })
  quantity: number;
}

