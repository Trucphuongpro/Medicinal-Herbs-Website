import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductsService } from '../products/products.service';
import { UsersService } from '../users/users.service';
import { CartsService } from './carts.service';
import { CartItem } from './entities/cart-item.entity';
import { Cart } from './entities/cart.entity';

describe('CartsService', () => {
  let service: CartsService;
  const repositoryMock = {
    create: jest.fn(),
    delete: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartsService,
        {
          provide: getRepositoryToken(Cart),
          useValue: repositoryMock,
        },
        {
          provide: getRepositoryToken(CartItem),
          useValue: repositoryMock,
        },
        {
          provide: ProductsService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CartsService>(CartsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
