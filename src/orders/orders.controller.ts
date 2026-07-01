import {
  Controller,
  Get,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CheckoutOrderDto } from './dto/checkout-order.dto';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import type { CurrentUserPayload } from '../auth/decorator/current-user.decorator';
import { Body, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiParam,
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { Order, OrderStatus } from './entities/order.entity';
import { GetOrdersQueryDto } from './dto/get-orders-query.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { Roles } from '../auth/decorator/roles.decorator';
import { UserRole } from '../users/enum/enum.userrole';
import { RolesGuard } from '../auth/guards/roles/roles.guard';

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

  @ApiOperation({
    summary: 'Lấy danh sách đơn hàng',
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'status', required: false, enum: OrderStatus })
  @ApiQuery({ name: 'keyword', required: false, type: String })
  @ApiUnauthorizedResponse({
    description: 'Chua dang nhap hoac token khong hop le',
  })
  @Get()
  getOrders(
    @CurrentUser() user: CurrentUserPayload,
    @Query() query: GetOrdersQueryDto,
  ) {
    if (user.role === UserRole.ADMIN) {
      return this.ordersService.getAllOrders(query);
    }

    return this.ordersService.getOrderByUserId(user.userId);
  }

  @ApiOperation({ summary: 'Lấy chi tiết đơn hàng' })
  @ApiParam({ name: 'orderId', description: 'UUID của đơn hàng' })
  @Get('detail/:orderId')
  getOrderDetail(
    @CurrentUser() user: CurrentUserPayload,
    @Param('orderId', new ParseUUIDPipe()) orderId: string,
  ): Promise<Order> {
    return this.ordersService.getOrderDetail(user.userId, orderId);
  }

  @ApiOperation({ summary: 'Hủy đơn hàng của người dùng' })
  @ApiParam({ name: 'orderId', description: 'UUID của đơn hàng' })
  @Patch(':orderId/cancel')
  cancelOrder(
    @CurrentUser() user: CurrentUserPayload,
    @Param('orderId', new ParseUUIDPipe()) orderId: string,
  ) {
    return this.ordersService.cancelOrder(user.userId, orderId);
  }

  @ApiOperation({ summary: 'Admin xem chi tiết đơn hàng' })
  @ApiParam({ name: 'id', description: 'UUID của đơn hàng' })
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get(':id')
  getOrderDetailAdmin(@Param('id', new ParseUUIDPipe()) orderId: string) {
    return this.ordersService.getOrderDetailAdmin(orderId);
  }

  @ApiOperation({ summary: 'Admin cập nhật trạng thái đơn hàng' })
  @ApiParam({ name: 'id', description: 'UUID của đơn hàng' })
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(':id/status')
  updateOrderStatus(
    @Param('id', new ParseUUIDPipe()) orderId: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return this.ordersService.updateOrderStatus(
      orderId,
      updateOrderStatusDto.status,
    );
  }
}
