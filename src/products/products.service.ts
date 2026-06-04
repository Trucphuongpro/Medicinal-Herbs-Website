import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const category = await this.categoriesService.findOne(
      createProductDto.category_id,
    );

    try {
      const product = this.productRepository.create({
        ...createProductDto,
        price: createProductDto.price.toFixed(2),
        description: createProductDto.description ?? null,
        image: createProductDto.image ?? null,
        category,
      });

      return await this.productRepository.save(product);
    } catch (error) {
      this.handlePersistenceError(error);
    }
  }

  async findAll() {
    return this.productRepository.find({
      order: { created_at: 'DESC' },
      relations: { category: true },
    });
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: { category: true },
    });

    if (!product) {
      throw new NotFoundException(`Product with id "${id}" not found`);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);

    if (updateProductDto.category_id) {
      const category = await this.categoriesService.findOne(
        updateProductDto.category_id,
      );
      product.category = category;
      product.category_id = category.id;
    }

    if (updateProductDto.price !== undefined) {
      product.price = updateProductDto.price.toFixed(2);
    }

    Object.assign(product, updateProductDto);

    try {
      return await this.productRepository.save(product);
    } catch (error) {
      this.handlePersistenceError(error);
    }
  }
  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
    return { message: 'Product deleted successfully' };
  }

  private handlePersistenceError(error: unknown): never {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === '23505'
    ) {
      throw new ConflictException('Product already exists');
    }

    throw error;
  }
}
