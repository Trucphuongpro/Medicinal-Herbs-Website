/**
 * Seed du lieu mau cho website duoc lieu.
 *
 *   npm run seed
 *
 * Script XOA sach du lieu trong cac bang nghiep vu roi chen lai bo du lieu mau,
 * nen chi chay tren moi truong development.
 */
import 'dotenv/config';
import * as bcrypt from 'bcrypt';
import dataSource from '../../../data-source';
import { Category } from '../../categories/entities/category.entity';
import { Product } from '../../products/entities/product.entity';
import { User } from '../../users/entities/user.entity';
import { UserRole } from '../../users/enum/enum.userrole';
import { Cart } from '../../carts/entities/cart.entity';
import { CartItem } from '../../carts/entities/cart-item.entity';
import { Review } from '../../reviews/entities/review.entity';
import {
  Order,
  OrderStatus,
  PaymentMethod,
} from '../../orders/entities/order.entity';
import { OrderItem } from '../../orders/entities/order-item.entity';
import {
  CATEGORIES,
  PHONES,
  REVIEW_TEMPLATES,
  SEED_USERS,
  SHIPPING_ADDRESSES,
  imageUrlFor,
} from './catalog';

/** PRNG co seed co dinh -> chay lai nhieu lan van ra cung ket qua. */
function createRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}
const rand = createRandom(20260826);
const pick = <T>(arr: T[]): T => arr[Math.floor(rand() * arr.length)];
const randInt = (min: number, max: number) =>
  min + Math.floor(rand() * (max - min + 1));

const DAY = 24 * 60 * 60 * 1000;
const now = Date.now();
const daysAgo = (d: number) => new Date(now - d * DAY);

async function main() {
  // Script nay TRUNCATE 8 bang. Tren production phai co --force de tranh
  // xoa nham du lieu khach hang.
  if (process.env.NODE_ENV === 'production' && !process.argv.includes('--force')) {
    console.error(
      'Tu choi chay: NODE_ENV=production. Script se XOA sach du lieu 8 bang.\n' +
        'Neu chac chan (vi du seed lan dau cho DB trong), chay lai voi: npm run seed -- --force',
    );
    process.exit(1);
  }

  await dataSource.initialize();
  console.log(`Ket noi DB ${process.env.DB_NAME}@${process.env.DB_HOST}:${process.env.DB_PORT}`);

  await dataSource.query(
    'TRUNCATE TABLE order_items, orders, cart_items, carts, reviews, products, categories, users RESTART IDENTITY CASCADE',
  );
  console.log('Da xoa du lieu cu.');

  // ----- Users -----
  const userRepo = dataSource.getRepository(User);
  const adminHash = await bcrypt.hash('admin123', 10);
  const userHash = await bcrypt.hash('123456', 10);
  const users = await userRepo.save(
    SEED_USERS.map((u) =>
      userRepo.create({
        fullname: u.fullname,
        email: u.email,
        password: u.role === 'ADMIN' ? adminHash : userHash,
        role: u.role === 'ADMIN' ? UserRole.ADMIN : UserRole.USER,
        is_active: true,
      }),
    ),
  );
  const customers = users.filter((u) => u.role === UserRole.USER);
  console.log(`Da tao ${users.length} nguoi dung.`);

  // ----- Categories + Products -----
  const categoryRepo = dataSource.getRepository(Category);
  const productRepo = dataSource.getRepository(Product);
  const products: Product[] = [];

  for (const seedCategory of CATEGORIES) {
    const category = await categoryRepo.save(
      categoryRepo.create({ name: seedCategory.name }),
    );
    const saved = await productRepo.save(
      seedCategory.products.map((p) =>
        productRepo.create({
          category_id: category.id,
          name: p.name,
          description: p.description,
          price: p.price.toFixed(2),
          stock: p.stock,
          image: imageUrlFor(p.slug),
        }),
      ),
    );
    products.push(...saved);
  }
  console.log(
    `Da tao ${CATEGORIES.length} danh muc va ${products.length} san pham.`,
  );

  // Trai deu ngay tao san pham trong 6 thang gan nhat de FE co muc "Hang moi ve".
  for (const [index, product] of products.entries()) {
    await dataSource.query('UPDATE products SET created_at = $1 WHERE id = $2', [
      daysAgo(180 - index * 5 + randInt(0, 3)),
      product.id,
    ]);
  }

  // ----- Reviews -----
  const reviewRepo = dataSource.getRepository(Review);
  const reviews: Review[] = [];
  for (const product of products) {
    const count = randInt(0, Math.min(5, customers.length));
    const shuffled = [...customers].sort(() => rand() - 0.5).slice(0, count);
    for (const customer of shuffled) {
      // Nghieng ve danh gia tot: 5 sao chiem da so.
      const roll = rand();
      const rating = roll < 0.55 ? 5 : roll < 0.83 ? 4 : roll < 0.95 ? 3 : 2;
      reviews.push(
        reviewRepo.create({
          user_id: customer.id,
          product_id: product.id,
          rating,
          comment: pick(REVIEW_TEMPLATES[rating]),
          is_hidden: rand() < 0.04,
        }),
      );
    }
  }
  const savedReviews = await reviewRepo.save(reviews);
  for (const review of savedReviews) {
    await dataSource.query('UPDATE reviews SET created_at = $1 WHERE id = $2', [
      daysAgo(randInt(1, 120)),
      review.id,
    ]);
  }
  console.log(`Da tao ${savedReviews.length} danh gia.`);

  // ----- Carts (gio hang dang mo cua mot so khach) -----
  const cartRepo = dataSource.getRepository(Cart);
  const cartItemRepo = dataSource.getRepository(CartItem);
  let cartItemCount = 0;
  for (const customer of customers) {
    const cart = await cartRepo.save(cartRepo.create({ user_id: customer.id }));
    if (rand() < 0.3) continue; // mot so khach de gio hang trong
    const chosen = [...products].sort(() => rand() - 0.5).slice(0, randInt(1, 3));
    for (const product of chosen) {
      await cartItemRepo.save(
        cartItemRepo.create({
          cart_id: cart.id,
          product_id: product.id,
          quantity: randInt(1, 3),
          price: product.price,
        }),
      );
      cartItemCount += 1;
    }
  }
  console.log(
    `Da tao ${customers.length} gio hang (${cartItemCount} dong san pham).`,
  );

  // ----- Orders -----
  const orderRepo = dataSource.getRepository(Order);
  const orderItemRepo = dataSource.getRepository(OrderItem);
  const STATUS_PLAN: OrderStatus[] = [
    OrderStatus.COMPLETED,
    OrderStatus.COMPLETED,
    OrderStatus.COMPLETED,
    OrderStatus.COMPLETED,
    OrderStatus.DELIVERED,
    OrderStatus.DELIVERED,
    OrderStatus.SHIPPING,
    OrderStatus.SHIPPING,
    OrderStatus.PAID,
    OrderStatus.CONFIRMED,
    OrderStatus.CONFIRMED,
    OrderStatus.PENDING,
    OrderStatus.PENDING,
    OrderStatus.CANCELED,
  ];
  const PAYMENTS = [
    PaymentMethod.COD,
    PaymentMethod.BANK_TRANSFER,
    PaymentMethod.VNPAY,
    PaymentMethod.MOMO,
  ];

  for (const [index, status] of STATUS_PLAN.entries()) {
    const chosen = [...products].sort(() => rand() - 0.5).slice(0, randInt(1, 4));
    const items = chosen.map((product) => {
      const quantity = randInt(1, 3);
      return orderItemRepo.create({
        product_id: product.id,
        quantity,
        price: product.price,
      });
    });
    const total = items.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0,
    );
    const order = await orderRepo.save(
      orderRepo.create({
        user_id: pick(customers).id,
        total_price: total.toFixed(2),
        status,
        payment_method: pick(PAYMENTS),
        shipping_address: pick(SHIPPING_ADDRESSES),
        phone: pick(PHONES),
      }),
    );
    // Luu items sau khi da co order.id, giong cach OrdersService checkout lam.
    for (const item of items) {
      item.order_id = order.id;
    }
    await orderItemRepo.save(items);
    await dataSource.query('UPDATE orders SET created_at = $1 WHERE id = $2', [
      daysAgo(90 - index * 6 + randInt(0, 4)),
      order.id,
    ]);
  }
  console.log(`Da tao ${STATUS_PLAN.length} don hang.`);

  await dataSource.destroy();
  console.log('\nSeed hoan tat.');
  console.log('  Admin : admin@duoclieu.vn / admin123');
  console.log('  User  : khoa.tran@gmail.com / 123456 (va cac tai khoan con lai)');
}

main().catch(async (error) => {
  console.error('Seed that bai:', error);
  if (dataSource.isInitialized) await dataSource.destroy();
  process.exit(1);
});
