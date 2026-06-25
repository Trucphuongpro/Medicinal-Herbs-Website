import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddToCartDto } from './dto/add_to_cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { ProductsService } from '../products/products.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
    private readonly productsService: ProductsService,
    private readonly usersService: UsersService,
  ) {}

  async addItem(userId: string, addToCartDto: AddToCartDto) {
    const [cart, product] = await Promise.all([
      this.getOrCreateCart(userId),
      this.productsService.findOne(addToCartDto.productId),
    ]);

    const existingItem = await this.cartItemRepository.findOne({
      where: {
        cart_id: cart.id,
        product_id: product.id,
      },
    });

    const nextQuantity = (existingItem?.quantity ?? 0) + addToCartDto.quantity;
    this.ensureEnoughStock(product.stock, nextQuantity);

    if (existingItem) {
      existingItem.quantity = nextQuantity;
      existingItem.price = product.price;
      await this.cartItemRepository.save(existingItem);
      return this.findByUser(userId);
    }

    const item = this.cartItemRepository.create({
      cart,
      cart_id: cart.id,
      product,
      product_id: product.id,
      quantity: addToCartDto.quantity,
      price: product.price,
    });

    await this.cartItemRepository.save(item);
    return this.findByUser(userId);
  }

  async findByUser(userId: string) {
    const cart = await this.getOrCreateCart(userId);

    const cartWithItems = await this.cartRepository.findOne({
      where: { id: cart.id },
      relations: {
        items: {
          product: true,
        },
      },
      order: {
        items: {
          id: 'ASC',
        },
      },
    });

    if (!cartWithItems) {
      throw new NotFoundException('Cart not found');
    }

    return this.buildCartResponse(cartWithItems);
  }

  async updateItem(
    userId: string,
    itemId: string,
    updateCartDto: UpdateCartDto,
  ) {
    const item = await this.findUserCartItem(userId, itemId);
    this.ensureEnoughStock(item.product.stock, updateCartDto.quantity);

    item.quantity = updateCartDto.quantity;
    item.price = item.product.price;

    await this.cartItemRepository.save(item);
    return this.findByUser(userId);
  }

  async removeItem(userId: string, itemId: string) {
    const item = await this.findUserCartItem(userId, itemId);
    await this.cartItemRepository.remove(item);
    return this.findByUser(userId);
  }

  async clear(userId: string) {
    const cart = await this.getOrCreateCart(userId);

    await this.cartItemRepository.delete({
      cart_id: cart.id,
    });

    return this.findByUser(userId);
  }

  private async getOrCreateCart(userId: string) {
    const existingCart = await this.cartRepository.findOne({
      where: { user_id: userId },
    });

    if (existingCart) {
      return existingCart;
    }

    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const cart = this.cartRepository.create({
      user,
      user_id: user.id,
    });

    return this.cartRepository.save(cart);
  }

  private async findUserCartItem(userId: string, itemId: string) {
    const cart = await this.getOrCreateCart(userId);

    const item = await this.cartItemRepository.findOne({
      where: {
        id: itemId,
        cart_id: cart.id,
      },
      relations: {
        product: true,
      },
    });

    if (!item) {
      throw new NotFoundException('Cart item not found');
    }

    return item;
  }

  private ensureEnoughStock(stock: number, quantity: number) {
    if (quantity > stock) {
      throw new BadRequestException('Quantity exceeds product stock');
    }
  }

  private buildCartResponse(cart: Cart) {
    const items = cart.items ?? [];
    const total = items.reduce((sum, item) => {
      return sum + Number(item.price) * item.quantity;
    }, 0);

    return {
      id: cart.id,
      user_id: cart.user_id,
      created_at: cart.created_at,
      items,
      total: total.toFixed(2),
    };
  }
}
