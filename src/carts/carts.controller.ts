import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CartsService } from './carts.service';
import { AddToCartDto } from './dto/add_to_cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import type { CurrentUserPayload } from '../auth/decorator/current-user.decorator';

@ApiTags('Cart')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post('add')
  @ApiOperation({ summary: 'Them san pham vao gio hang' })
  @ApiBody({ type: AddToCartDto })
  @ApiOkResponse({ description: 'Them san pham vao gio hang thanh cong' })
  @ApiBadRequestResponse({
    description: 'So luong khong hop le hoac vuot ton kho',
  })
  @ApiUnauthorizedResponse({
    description: 'Chua dang nhap hoac token khong hop le',
  })
  @ApiNotFoundResponse({ description: 'Khong tim thay user hoac product' })
  addItem(
    @CurrentUser() user: CurrentUserPayload,
    @Body() addToCartDto: AddToCartDto,
  ) {
    return this.cartsService.addItem(user.userId, addToCartDto);
  }

  @Get()
  @ApiOperation({ summary: 'Xem gio hang cua user dang nhap' })
  @ApiOkResponse({ description: 'Lay gio hang thanh cong' })
  @ApiUnauthorizedResponse({
    description: 'Chua dang nhap hoac token khong hop le',
  })
  findCart(@CurrentUser() user: CurrentUserPayload) {
    return this.cartsService.findByUser(user.userId);
  }

  @Patch('item/:itemId')
  @ApiOperation({ summary: 'Cap nhat so luong san pham trong gio hang' })
  @ApiParam({ name: 'itemId', description: 'UUID cua cart item' })
  @ApiBody({ type: UpdateCartDto })
  @ApiOkResponse({ description: 'Cap nhat so luong thanh cong' })
  @ApiBadRequestResponse({
    description:
      'Item ID khong dung UUID, so luong khong hop le hoac vuot ton kho',
  })
  @ApiUnauthorizedResponse({
    description: 'Chua dang nhap hoac token khong hop le',
  })
  @ApiNotFoundResponse({ description: 'Khong tim thay cart item' })
  updateItem(
    @CurrentUser() user: CurrentUserPayload,
    @Param('itemId', new ParseUUIDPipe()) itemId: string,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    return this.cartsService.updateItem(user.userId, itemId, updateCartDto);
  }

  @Delete('item/:itemId')
  @ApiOperation({ summary: 'Xoa san pham khoi gio hang' })
  @ApiParam({ name: 'itemId', description: 'UUID cua cart item' })
  @ApiOkResponse({ description: 'Xoa san pham khoi gio hang thanh cong' })
  @ApiBadRequestResponse({ description: 'Item ID khong dung dinh dang UUID' })
  @ApiUnauthorizedResponse({
    description: 'Chua dang nhap hoac token khong hop le',
  })
  @ApiNotFoundResponse({ description: 'Khong tim thay cart item' })
  removeItem(
    @CurrentUser() user: CurrentUserPayload,
    @Param('itemId', new ParseUUIDPipe()) itemId: string,
  ) {
    return this.cartsService.removeItem(user.userId, itemId);
  }

  @Delete('clear')
  @ApiOperation({ summary: 'Xoa toan bo gio hang' })
  @ApiOkResponse({ description: 'Xoa toan bo gio hang thanh cong' })
  @ApiUnauthorizedResponse({
    description: 'Chua dang nhap hoac token khong hop le',
  })
  clear(@CurrentUser() user: CurrentUserPayload) {
    return this.cartsService.clear(user.userId);
  }
}
