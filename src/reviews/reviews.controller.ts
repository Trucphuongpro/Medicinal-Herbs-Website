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
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { UpdateReviewVisibilityDto } from './dto/update-review-visibility.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import type { CurrentUserPayload } from '../auth/decorator/current-user.decorator';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { UserRole } from '../users/enum/enum.userrole';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Tạo review mới' })
  @Post()
  create(
    @CurrentUser() user: CurrentUserPayload,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    return this.reviewsService.create(user.userId, createReviewDto);
  }

  @ApiOperation({ summary: 'Danh sách review của một sản phẩm' })
  @ApiParam({ name: 'productId', description: 'UUID của sản phẩm' })
  @ApiOperation({ summary: 'Danh gia noi bat hien o trang chu (cong khai)' })
  @Get('featured')
  findFeatured() {
    return this.reviewsService.findFeatured();
  }

  @Get('product/:productId')
  findByProduct(@Param('productId', new ParseUUIDPipe()) productId: string) {
    return this.reviewsService.findByProduct(productId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Admin xem tất cả review' })
  @Get('admin')
  findAllAdmin() {
    return this.reviewsService.findAllAdmin();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Sửa review của người dùng' })
  @ApiParam({ name: 'id', description: 'UUID của review' })
  @Patch(':id')
  update(
    @CurrentUser() user: CurrentUserPayload,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewsService.update(user.userId, id, updateReviewDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Xóa review của người dùng' })
  @ApiParam({ name: 'id', description: 'UUID của review' })
  @Delete(':id')
  remove(
    @CurrentUser() user: CurrentUserPayload,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.reviewsService.remove(user.userId, id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Admin ẩn hoặc hiện review' })
  @ApiParam({ name: 'id', description: 'UUID của review' })
  @Patch('admin/:id/visibility')
  updateVisibility(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateReviewVisibilityDto: UpdateReviewVisibilityDto,
  ) {
    return this.reviewsService.updateVisibility(
      id,
      updateReviewVisibilityDto.is_hidden,
    );
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Admin xóa review' })
  @ApiParam({ name: 'id', description: 'UUID của review' })
  @Delete('admin/:id')
  removeAdmin(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.reviewsService.removeAdmin(id);
  }
}
