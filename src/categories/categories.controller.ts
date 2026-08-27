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
  ApiConflictResponse,
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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Chua dang nhap' })
  @ApiForbiddenResponse({ description: 'Khong phai admin' })
  @Post()
  @ApiOperation({ summary: 'Tao category moi' })
  @ApiCreatedResponse({
    description: 'Tao category thanh cong',
    type: Category,
  })
  @ApiConflictResponse({ description: 'Ten category da ton tai' })
  @ApiBadRequestResponse({ description: 'Du lieu gui len khong hop le' })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lay danh sach category' })
  @ApiOkResponse({
    description: 'Lay danh sach category thanh cong',
    type: Category,
    isArray: true,
  })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lay chi tiet category' })
  @ApiParam({ name: 'id', description: 'UUID cua category' })
  @ApiOkResponse({
    description: 'Lay chi tiet category thanh cong',
    type: Category,
  })
  @ApiNotFoundResponse({ description: 'Khong tim thay category' })
  @ApiBadRequestResponse({
    description: 'ID category khong dung dinh dang UUID',
  })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.categoriesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Chua dang nhap' })
  @ApiForbiddenResponse({ description: 'Khong phai admin' })
  @Patch(':id')
  @ApiOperation({ summary: 'Cap nhat category' })
  @ApiParam({ name: 'id', description: 'UUID cua category' })
  @ApiOkResponse({
    description: 'Cap nhat category thanh cong',
    type: Category,
  })
  @ApiNotFoundResponse({ description: 'Khong tim thay category' })
  @ApiConflictResponse({ description: 'Ten category da ton tai' })
  @ApiBadRequestResponse({ description: 'Du lieu cap nhat khong hop le' })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Chua dang nhap' })
  @ApiForbiddenResponse({ description: 'Khong phai admin' })
  @Delete(':id')
  @ApiOperation({ summary: 'Xoa category' })
  @ApiParam({ name: 'id', description: 'UUID cua category' })
  @ApiOkResponse({
    description: 'Xoa category thanh cong',
    schema: {
      example: {
        message: 'Category deleted successfully',
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Khong tim thay category' })
  @ApiConflictResponse({
    description: 'Category dang duoc gan voi product nen khong the xoa',
  })
  @ApiBadRequestResponse({
    description: 'ID category khong dung dinh dang UUID',
  })
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.categoriesService.remove(id);
  }
}
