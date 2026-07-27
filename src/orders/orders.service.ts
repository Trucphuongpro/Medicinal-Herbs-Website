import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Brackets, Repository } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from '../carts/entities/cart.entity';
import { CartItem } from '../carts/entities/cart-item.entity';
import { CheckoutOrderDto } from './dto/checkout-order.dto';
import { OrderItem } from './entities/order-item.entity';
import { GetOrdersQueryDto } from './dto/get-orders-query.dto';

type PaginatedOrders = {
  data: Order[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

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
        status: OrderStatus.PENDING,
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
      order: { created_at: 'DESC' },
    });
    return orders;
  }

  // lấy tất cả đơn hàng của admin
  async getAllOrders(query: GetOrdersQueryDto): Promise<PaginatedOrders> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const queryBuilder = this.OrdersRepository.createQueryBuilder('order');

    if (query.status) {
      queryBuilder.andWhere('order.status = :status', {
        status: query.status,
      });
    }

    if (query.keyword?.trim()) {
      const keyword = `%${query.keyword.trim()}%`;
      queryBuilder.andWhere(
        new Brackets((builder) => {
          builder
            .where('order.id::text ILIKE :keyword', { keyword })
            .orWhere('order.user_id::text ILIKE :keyword', { keyword })
            .orWhere('order.phone ILIKE :keyword', { keyword })
            .orWhere('order.shipping_address ILIKE :keyword', { keyword });
        }),
      );
    }

    const [data, total] = await queryBuilder
      .orderBy('order.created_at', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  //Chi tiết đơn hàng
  async getOrderDetail(userId: string, orderId: string): Promise<Order> {
    //Tìm order
    const order = await this.OrdersRepository.findOne({
      where: { id: orderId },
      relations: { items: true },
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

  // lấy chi tiết đơn hàng của admin
  async getOrderDetailAdmin(orderId: string): Promise<Order> {
    const order = await this.OrdersRepository.findOne({
      where: { id: orderId },
      relations: { items: true },
    });

    if (!order) {
      throw new NotFoundException('Not found Orders');
    }

    return order;
  }

  // hủy đơn hàng
  async cancelOrder(userId: string, orderId: string): Promise<Order> {
    const order = await this.OrdersRepository.findOne({
      where: { id: orderId },
      relations: { items: true },
    });

    if (!order) {
      throw new NotFoundException('Not found Orders');
    }

    if (order.user_id !== userId) {
      throw new ForbiddenException(
        'You are are not allowed to cancel this order',
      );
    }

    if (order.status !== OrderStatus.PENDING) {
      throw new BadRequestException('Only pending orders can be cancelled');
    }

    order.status = OrderStatus.CANCELED;
    return this.OrdersRepository.save(order);
  }

  // cập nhật trạng thái đơn hàng
  async updateOrderStatus(
    orderId: string,
    status: OrderStatus,
  ): Promise<Order> {
    const order = await this.OrdersRepository.findOne({
      where: { id: orderId },
      relations: { items: true },
    });

    if (!order) {
      throw new NotFoundException('Not found Orders');
    }

    const allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
      [OrderStatus.PENDING]: [OrderStatus.CONFIRMED, OrderStatus.CANCELED],
      [OrderStatus.CONFIRMED]: [OrderStatus.SHIPPING, OrderStatus.CANCELED],
      [OrderStatus.SHIPPING]: [OrderStatus.DELIVERED],
      [OrderStatus.DELIVERED]: [],
      [OrderStatus.COMPLETED]: [],
      [OrderStatus.CANCELED]: [],
      [OrderStatus.PAID]: [OrderStatus.CONFIRMED, OrderStatus.SHIPPING],
    };

    if (order.status === status) {
      throw new BadRequestException('Order already has this status');
    }

    const currentStatus = order.status;
    const nextStatuses = allowedTransitions[currentStatus] ?? [];

    if (!nextStatuses.includes(status)) {
      throw new BadRequestException(
        `Invalid order status transition from ${currentStatus} to ${status}`,
      );
    }

    order.status = status;
    return this.OrdersRepository.save(order);
  }
}
