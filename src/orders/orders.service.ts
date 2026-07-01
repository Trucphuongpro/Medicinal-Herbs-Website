import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from '../carts/entities/cart.entity';
import { CartItem } from 'src/carts/entities/cart-item.entity';
import { CheckoutOrderDto } from './dto/checkout-order.dto';
import { OrderItem } from './entities/order-item.entity';
@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly OrdersRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,

    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  // có chức năng checkout đơn hàng từ giỏ hàng của người dùng sau đó lưu thông tin đơn hàng vào cơ sở dữ liệu và xoá các mục trong giỏ hàng người dùng
  async checkoutOrder(userId: string, checkoutOrderDto: CheckoutOrderDto) {
    //Tìm cart theo orderId
    const cart = await this.cartRepository.findOne({
      where: { user_id: userId },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    //Lấy cart items
    const cartItems = await this.cartItemRepository.find({
      where: { cart_id: cart.id },
    });

    if (cartItems.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    //Tính giá trị tổng đơn hàng
    const totalPrice = cartItems.reduce(
      (total, item) => total + parseFloat(item.price) * item.quantity,
      0,
    );

    //Tạo đơn hàng mới
    const order = await this.OrdersRepository.save(
      this.OrdersRepository.create({
        user_id: userId,
        total_price: totalPrice.toFixed(2),
        status: 'pending',
        payment_method: checkoutOrderDto.payment_method,
        shipping_address: checkoutOrderDto.shipping_address,
        phone: checkoutOrderDto.phone,
      }),
    );

    const orderItems = cartItems.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price,
    }));

    await this.orderItemRepository.insert(orderItems);

    //Xóa cart items sau khi tạo đơn hàng
    await this.cartItemRepository.delete({ cart_id: cart.id });

    return {
      ...order,
      items: orderItems,
    };
  }

  // lấy tất cả đơn hàng của người dùng theo userId
  async getOrderByUserId(userId: string): Promise<Order[]> {
    //tìm tất cả đơn hàng theo userId
    const orders = await this.OrdersRepository.find({
      where: { user_id: userId },
    });
    return orders;
  }

  //Chi tiết đơn hàng
  async getOrderDetail(userId: string, orderId: string): Promise<Order> {
    //Tìm order
    const order = await this.OrdersRepository.findOne({
      where: { id: orderId },
    });
    if (!order) {
      throw new NotFoundException('Not found Orders');
    }
    //Kiểm tra thử user có trong order đó không
    if (order.user_id !== userId) {
      throw new ForbiddenException(
        'You are are not allowed to view this order',
      );
    }
    return order;
  }
}
