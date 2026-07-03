import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Product } from '../products/entities/product.entity';
import { OrderItem } from '../orders/entities/order-item.entity';
import { Order, OrderStatus } from '../orders/entities/order.entity';
import { User } from '../users/entities/user.entity';

type ReviewAuthor = Pick<
  User,
  'id' | 'fullname' | 'email' | 'role' | 'created_at'
>;

type ReviewResponse = Omit<Review, 'user' | 'product'> & {
  user: ReviewAuthor | null;
};

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(
    userId: string,
    createReviewDto: CreateReviewDto,
  ): Promise<ReviewResponse> {
    const product = await this.productRepository.findOne({
      where: { id: createReviewDto.productId },
    });

    if (!product) {
      throw new NotFoundException(
        `Product with id "${createReviewDto.productId}" not found`,
      );
    }

    await this.ensureUserPurchasedDeliveredProduct(
      userId,
      createReviewDto.productId,
    );

    const existingReview = await this.reviewRepository.findOne({
      where: {
        user_id: userId,
        product_id: createReviewDto.productId,
      },
    });

    if (existingReview) {
      throw new ConflictException('You have already reviewed this product');
    }

    const review = await this.reviewRepository.save(
      this.reviewRepository.create({
        user_id: userId,
        product_id: createReviewDto.productId,
        rating: createReviewDto.rating,
        comment: createReviewDto.comment ?? null,
      }),
    );

    return this.findById(review.id);
  }

  async findByProduct(productId: string): Promise<ReviewResponse[]> {
    const reviews = await this.reviewRepository.find({
      where: { product_id: productId },
      order: { created_at: 'DESC' },
      relations: { user: true },
    });

    return reviews.map((review) => this.sanitizeReview(review));
  }

  async update(
    userId: string,
    id: string,
    updateReviewDto: UpdateReviewDto,
  ): Promise<ReviewResponse> {
    const review = await this.reviewRepository.findOne({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException(`Review with id "${id}" not found`);
    }

    if (review.user_id !== userId) {
      throw new ForbiddenException('You are not allowed to update this review');
    }

    if (
      updateReviewDto.rating === undefined &&
      updateReviewDto.comment === undefined
    ) {
      throw new BadRequestException('No review data provided');
    }

    if (updateReviewDto.rating !== undefined) {
      review.rating = updateReviewDto.rating;
    }

    if (updateReviewDto.comment !== undefined) {
      review.comment = updateReviewDto.comment;
    }

    await this.reviewRepository.save(review);
    return this.findById(review.id);
  }

  async remove(userId: string, id: string): Promise<{ message: string }> {
    const review = await this.reviewRepository.findOne({
      where: { id },
    });

    if (!review) {
      throw new NotFoundException(`Review with id "${id}" not found`);
    }

    if (review.user_id !== userId) {
      throw new ForbiddenException('You are not allowed to delete this review');
    }

    await this.reviewRepository.remove(review);

    return { message: 'Review deleted successfully' };
  }

  private async ensureUserPurchasedDeliveredProduct(
    userId: string,
    productId: string,
  ) {
    const deliveredOrders = await this.orderRepository.find({
      where: {
        user_id: userId,
        status: OrderStatus.DELIVERED,
      },
      select: {
        id: true,
      },
    });

    const completedOrders = await this.orderRepository.find({
      where: {
        user_id: userId,
        status: OrderStatus.COMPLETED,
      },
      select: {
        id: true,
      },
    });

    const orderIds = [...deliveredOrders, ...completedOrders].map(
      (order) => order.id,
    );

    const orderItems = await this.orderItemRepository.count({
      where: {
        product_id: productId,
        order_id: In(orderIds),
      },
    });

    if (orderIds.length === 0 || orderItems === 0) {
      throw new ForbiddenException(
        'You can only review products from your delivered or completed orders',
      );
    }
  }

  private async findById(id: string): Promise<ReviewResponse> {
    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: { user: true },
    });

    if (!review) {
      throw new NotFoundException(`Review with id "${id}" not found`);
    }

    return this.sanitizeReview(review);
  }

  private sanitizeReview(review: Review): ReviewResponse {
    const { user, ...rest } = review;

    return {
      ...rest,
      user: user
        ? {
            id: user.id,
            fullname: user.fullname,
            email: user.email,
            role: user.role,
            created_at: user.created_at,
          }
        : null,
    };
  }
}
