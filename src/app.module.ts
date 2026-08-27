import { join } from 'node:path';
import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { ReviewsModule } from './reviews/reviews.module';
import { OrdersModule } from './orders/orders.module';
import { CartsModule } from './carts/carts.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UploadModule } from './upload/upload/upload.module';
import { getDatabaseConnection, isProduction } from './config/database.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      ...getDatabaseConnection(),
      autoLoadEntities: true,
      migrations: [join(__dirname, 'database', 'migrations', '*.{ts,js}')],
      // Tren production chi chay migration. synchronize tu sua schema cho khop
      // entity va co the XOA cot dang chua du lieu that.
      synchronize: !isProduction(),
      migrationsRun: isProduction(),
    }),
    ProductsModule,
    UsersModule,
    AuthModule,
    CategoriesModule,
    CartsModule,
    OrdersModule,
    ReviewsModule,
    UploadModule,
  ],
})
export class AppModule {}
