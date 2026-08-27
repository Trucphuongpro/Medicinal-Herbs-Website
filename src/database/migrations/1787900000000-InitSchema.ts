import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Migration khoi tao toan bo schema: 8 bang nghiep vu, kieu enum vai tro,
 * cac chi muc va khoa ngoai.
 *
 * Sinh tu schema that dang chay (pg_dump --schema-only), tuong duong voi
 * schema ma synchronize tao ra. Tu day tro di moi thay doi schema deu phai
 * qua migration, khong dung synchronize tren production.
 *
 * Moi cau lenh deu idempotent: CREATE ... IF NOT EXISTS, bat duplicate_object
 * cho CREATE TYPE, va kiem tra pg_constraint truoc khi ADD CONSTRAINT. Nho vay
 * chay lai tren DB da co san schema se khong loi.
 */
export class InitSchema1787900000000 implements MigrationInterface {
  name = 'InitSchema1787900000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public`);

    await queryRunner.query(`DO $$ BEGIN
CREATE TYPE public.users_role_enum AS ENUM (
    'USER',
    'ADMIN'
);
EXCEPTION WHEN duplicate_object THEN NULL; END $$`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS public.cart_items (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    cart_id uuid NOT NULL,
    product_id uuid NOT NULL,
    quantity integer NOT NULL,
    price numeric(12,2) NOT NULL
)`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS public.carts (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
)`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS public.categories (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(255) NOT NULL
)`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS public.order_items (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    order_id uuid NOT NULL,
    product_id uuid NOT NULL,
    quantity integer NOT NULL,
    price numeric(12,2) NOT NULL
)`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS public.orders (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    total_price numeric(12,2) NOT NULL,
    status character varying(30) DEFAULT 'pending'::character varying NOT NULL,
    payment_method character varying(50) NOT NULL,
    shipping_address text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    phone character varying NOT NULL
)`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS public.products (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    category_id uuid NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    price numeric(12,2) NOT NULL,
    stock integer DEFAULT 0 NOT NULL,
    image character varying(1024),
    created_at timestamp with time zone DEFAULT now() NOT NULL
)`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS public.reviews (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    product_id uuid NOT NULL,
    rating integer NOT NULL,
    comment text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    is_hidden boolean DEFAULT false NOT NULL
)`);

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    fullname character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    role public.users_role_enum DEFAULT 'USER'::public.users_role_enum NOT NULL,
    is_active boolean DEFAULT true NOT NULL
)`);

    await queryRunner.query(`DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'PK_005269d8574e6fac0493715c308') THEN
    ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT "PK_005269d8574e6fac0493715c308" PRIMARY KEY (id);
  END IF;
END $$`);

    await queryRunner.query(`DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'PK_0806c755e0aca124e67c0cf6d7d') THEN
    ALTER TABLE ONLY public.products
    ADD CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY (id);
  END IF;
END $$`);

    await queryRunner.query(`DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'PK_231ae565c273ee700b283f15c1d') THEN
    ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY (id);
  END IF;
END $$`);

    await queryRunner.query(`DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'PK_24dbc6126a28ff948da33e97d3b') THEN
    ALTER TABLE ONLY public.categories
    ADD CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY (id);
  END IF;
END $$`);

    await queryRunner.query(`DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'PK_6fccf5ec03c172d27a28a82928b') THEN
    ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT "PK_6fccf5ec03c172d27a28a82928b" PRIMARY KEY (id);
  END IF;
END $$`);

    await queryRunner.query(`DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'PK_710e2d4957aa5878dfe94e4ac2f') THEN
    ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY (id);
  END IF;
END $$`);

    await queryRunner.query(`DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'PK_a3ffb1c0c8416b9fc6f907b7433') THEN
    ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);
  END IF;
END $$`);

    await queryRunner.query(`DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'PK_b5f695a59f5ebb50af3c8160816') THEN
    ALTER TABLE ONLY public.carts
    ADD CONSTRAINT "PK_b5f695a59f5ebb50af3c8160816" PRIMARY KEY (id);
  END IF;
END $$`);

    await queryRunner.query(`DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'UQ_2ec1c94a977b940d85a4f498aea') THEN
    ALTER TABLE ONLY public.carts
    ADD CONSTRAINT "UQ_2ec1c94a977b940d85a4f498aea" UNIQUE (user_id);
  END IF;
END $$`);

    await queryRunner.query(`DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'UQ_8b0be371d28245da6e4f4b61878') THEN
    ALTER TABLE ONLY public.categories
    ADD CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE (name);
  END IF;
END $$`);

    await queryRunner.query(`DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'UQ_97672ac88f789774dd47f7c8be3') THEN
    ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);
  END IF;
END $$`);

    await queryRunner.query(`DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'uq_cart_items_cart_product') THEN
    ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT uq_cart_items_cart_product UNIQUE (cart_id, product_id);
  END IF;
END $$`);

    await queryRunner.query(`DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'uq_order_items_order_product') THEN
    ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT uq_order_items_order_product UNIQUE (order_id, product_id);
  END IF;
END $$`);

    await queryRunner.query(`DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'uq_reviews_user_product') THEN
    ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT uq_reviews_user_product UNIQUE (user_id, product_id);
  END IF;
END $$`);

    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_145532db85752b29c57d2b7b1f" ON public.order_items USING btree (order_id)`);

    await queryRunner.query(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_2ec1c94a977b940d85a4f498ae" ON public.carts USING btree (user_id)`);

    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_30e89257a105eab7648a35c7fc" ON public.cart_items USING btree (product_id)`);

    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_6385a745d9e12a89b859bb2562" ON public.cart_items USING btree (cart_id)`);

    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_728447781a30bc3fcfe5c2f1cd" ON public.reviews USING btree (user_id)`);

    await queryRunner.query(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_8b0be371d28245da6e4f4b6187" ON public.categories USING btree (name)`);

    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_9263386c35b6b242540f9493b0" ON public.order_items USING btree (product_id)`);

    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_9482e9567d8dcc2bc615981ef4" ON public.reviews USING btree (product_id)`);

    await queryRunner.query(`CREATE UNIQUE INDEX IF NOT EXISTS "IDX_97672ac88f789774dd47f7c8be" ON public.users USING btree (email)`);

    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_9a5f6868c96e0069e699f33e12" ON public.products USING btree (category_id)`);

    await queryRunner.query(`CREATE INDEX IF NOT EXISTS "IDX_a922b820eeef29ac1c6800e826" ON public.orders USING btree (user_id)`);

    await queryRunner.query(`DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FK_145532db85752b29c57d2b7b1f1') THEN
    ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT "FK_145532db85752b29c57d2b7b1f1" FOREIGN KEY (order_id) REFERENCES public.orders(id) ON DELETE CASCADE;
  END IF;
END $$`);

    await queryRunner.query(`DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FK_2ec1c94a977b940d85a4f498aea') THEN
    ALTER TABLE ONLY public.carts
    ADD CONSTRAINT "FK_2ec1c94a977b940d85a4f498aea" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
  END IF;
END $$`);

    await queryRunner.query(`DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FK_30e89257a105eab7648a35c7fce') THEN
    ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT "FK_30e89257a105eab7648a35c7fce" FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE RESTRICT;
  END IF;
END $$`);

    await queryRunner.query(`DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FK_6385a745d9e12a89b859bb25623') THEN
    ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT "FK_6385a745d9e12a89b859bb25623" FOREIGN KEY (cart_id) REFERENCES public.carts(id) ON DELETE CASCADE;
  END IF;
END $$`);

    await queryRunner.query(`DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FK_728447781a30bc3fcfe5c2f1cdf') THEN
    ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT "FK_728447781a30bc3fcfe5c2f1cdf" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
  END IF;
END $$`);

    await queryRunner.query(`DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FK_9263386c35b6b242540f9493b00') THEN
    ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT "FK_9263386c35b6b242540f9493b00" FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE RESTRICT;
  END IF;
END $$`);

    await queryRunner.query(`DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FK_9482e9567d8dcc2bc615981ef44') THEN
    ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT "FK_9482e9567d8dcc2bc615981ef44" FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;
  END IF;
END $$`);

    await queryRunner.query(`DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FK_9a5f6868c96e0069e699f33e124') THEN
    ALTER TABLE ONLY public.products
    ADD CONSTRAINT "FK_9a5f6868c96e0069e699f33e124" FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE RESTRICT;
  END IF;
END $$`);

    await queryRunner.query(`DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'FK_a922b820eeef29ac1c6800e826a') THEN
    ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE RESTRICT;
  END IF;
END $$`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "order_items" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "orders" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "cart_items" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "carts" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "reviews" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "products" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "categories" CASCADE`);
    await queryRunner.query(`DROP TABLE IF EXISTS "users" CASCADE`);
    await queryRunner.query(`DROP TYPE IF EXISTS "public"."users_role_enum"`);
  }
}
