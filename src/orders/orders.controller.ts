import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CheckoutOrderDto } from './dto/checkout-order.dto';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import type { CurrentUserPayload } from '../auth/decorator/current-user.decorator';
import { Body, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { Order } from './entities/order.entity';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({ summary: 'Checkout giỏ hàng của người dùng' })
  @ApiUnauthorizedResponse({
    description: 'Chua dang nhap hoac token khong hop le',
  })
  @Post()
  chekoutOrder(
    @CurrentUser() user: CurrentUserPayload,
    @Body() checkoutOrderDto: CheckoutOrderDto,
  ) {
    return this.ordersService.checkoutOrder(user.userId, checkoutOrderDto);
  }

  @ApiOperation({ summary: 'Lấy tất cả đơn hàng của người dùng theo UserId' })
  @ApiUnauthorizedResponse({
    description: 'Chua dang nhap hoac token khong hop le',
  })
  @Get()
  getOrderByUserId(@CurrentUser() user: CurrentUserPayload) {
    return this.ordersService.getOrderByUserId(user.userId);
  }

  @ApiOperation({ summary: 'Lấy chi tiết đơn hàng' })
  @Get()
  getOrderDetail(
    @CurrentUser() user: CurrentUserPayload,
    @Param('orderId') orderId: string,
  ): Promise<Order> {
    return this.ordersService.getOrderDetail(user.userId, orderId);
  }
}
