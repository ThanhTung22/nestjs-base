import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { getLoggerToken } from 'nestjs-pino';
import { HelloEntity } from './hello.entity';
import {
  mockHello,
  mockCreateHelloDto,
  mockGetPageHelloResponseDto,
  mockGetHelloRequestDto,
  mockFindAndCountRes,
  mockNotFoundException,
} from './hello.mock';
import { HelloService } from './hello.service';

describe('HelloService', () => {
  let service: HelloService;
  const mockHttpService = {};
  const mockRepository = {
    save: jest.fn(),
    findAndCount: jest.fn(),
    findOne: jest.fn(),
  };
  const mockLogger = {
    info: jest.fn(),
    error: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HelloService,
        { provide: HttpService, useValue: mockHttpService },
        { provide: getRepositoryToken(HelloEntity), useValue: mockRepository },
        { provide: getLoggerToken(HelloService.name), useValue: mockLogger },
      ],
    }).compile();

    service = module.get<HelloService>(HelloService);
  });

  describe('create', () => {
    it('should be successful', async () => {
      mockRepository.save.mockResolvedValue(mockHello);
      const result = await service.create(mockCreateHelloDto);

      expect(result.id).toEqual(mockHello.id);
    });
  });

  describe('findAll', () => {
    it('should be successful', async () => {
      mockRepository.findAndCount.mockResolvedValue(mockFindAndCountRes);
      const result = await service.findAll(mockGetHelloRequestDto);

      expect(result.total).toEqual(mockGetPageHelloResponseDto.total);
    });
  });

  describe('findOne', () => {
    it('should be successful', async () => {
      mockRepository.findOne.mockResolvedValue(mockHello);
      const result = await service.findOne(mockHello.id);

      expect(result.id).toEqual(mockHello.id);
    });

    it('should be throw NotFoundException', async () => {
      mockRepository.findOne.mockResolvedValue(undefined);

      await expect(service.findOne(mockHello.id)).rejects.toThrow(
        mockNotFoundException,
      );
    });
  });
});
