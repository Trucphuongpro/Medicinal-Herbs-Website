import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = this.categoryRepository.create(createCategoryDto);
      return await this.categoryRepository.save(category);
    } catch (error) {
      this.handlePersistenceError(error);
    }
  }

  async findAll() {
    return this.categoryRepository.find({
      order: { name: 'ASC' },
      relations: { products: true },
    });
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: { products: true },
    });

    if (!category) {
      throw new NotFoundException(`Category with id "${id}" not found`);
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);
    Object.assign(category, updateCategoryDto);

    try {
      return await this.categoryRepository.save(category);
    } catch (error) {
      this.handlePersistenceError(error);
    }
  }

  async remove(id: string) {
    const category = await this.findOne(id);

    if (category.products.length > 0) {
      throw new ConflictException(
        `Category with id "${id}" cannot be removed because it has products`,
      );
    }

    await this.categoryRepository.remove(category);
    return { message: 'Category deleted successfully' };
  }

  private handlePersistenceError(error: unknown): never {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === '23505'
    ) {
      throw new ConflictException('Category name already exists');
    }

    throw error;
  }
}
