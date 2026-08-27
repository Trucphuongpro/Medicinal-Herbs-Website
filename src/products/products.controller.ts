import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { UserRole } from '../users/enum/enum.userrole';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Chua dang nhap' })
  @ApiForbiddenResponse({ description: 'Khong phai admin' })
  @Post()
  @ApiOperation({ summary: 'Tao product moi' })
  @ApiCreatedResponse({
    description: 'Tao product thanh cong',
    type: Product,
  })
  @ApiBadRequestResponse({ description: 'Du lieu gui len khong hop le' })
  @ApiNotFoundResponse({ description: 'Category khong ton tai' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lay danh sach product' })
  @ApiOkResponse({
    description: 'Lay danh sach product thanh cong',
    type: Product,
    isArray: true,
  })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lay chi tiet product' })
  @ApiParam({ name: 'id', description: 'UUID cua product' })
  @ApiOkResponse({
    description: 'Lay chi tiet product thanh cong',
    type: Product,
  })
  @ApiNotFoundResponse({ description: 'Khong tim thay product' })
  @ApiBadRequestResponse({
    description: 'ID product khong dung dinh dang UUID',
  })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.productsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Chua dang nhap' })
  @ApiForbiddenResponse({ description: 'Khong phai admin' })
  @Patch(':id')
  @ApiOperation({ summary: 'Cap nhat product' })
  @ApiParam({ name: 'id', description: 'UUID cua product' })
  @ApiOkResponse({
    description: 'Cap nhat product thanh cong',
    type: Product,
  })
  @ApiNotFoundResponse({
    description: 'Khong tim thay product hoac category can cap nhat',
  })
  @ApiBadRequestResponse({ description: 'Du lieu cap nhat khong hop le' })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Chua dang nhap' })
  @ApiForbiddenResponse({ description: 'Khong phai admin' })
  @Delete(':id')
  @ApiOperation({ summary: 'Xoa product' })
  @ApiParam({ name: 'id', description: 'UUID cua product' })
  @ApiOkResponse({
    description: 'Xoa product thanh cong',
    schema: {
      example: {
        message: 'Product deleted successfully',
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Khong tim thay product' })
  @ApiBadRequestResponse({
    description: 'ID product khong dung dinh dang UUID',
  })
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.productsService.remove(id);
  }
}
