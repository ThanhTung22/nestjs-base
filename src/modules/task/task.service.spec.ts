import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { getLoggerToken } from 'nestjs-pino';
import { Task } from './task.entity';
import {
  mockTask,
  mockCreateTaskDto,
  mockGetTaskResponseDto,
  mockGetTaskDto,
  mockFindAndCountRes,
  mockNotFoundException,
} from './task.mock';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;
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
        TaskService,
        { provide: HttpService, useValue: mockHttpService },
        { provide: getRepositoryToken(Task), useValue: mockRepository },
        { provide: getLoggerToken(TaskService.name), useValue: mockLogger },
      ],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  describe('create', () => {
    it('should be successful', async () => {
      mockRepository.save.mockResolvedValue(mockTask);
      const result = await service.create(mockCreateTaskDto);

      expect(result.id).toEqual(mockTask.id);
    });
  });

  describe('findAll', () => {
    it('should be successful', async () => {
      mockRepository.findAndCount.mockResolvedValue(mockFindAndCountRes);
      const result = await service.findAll(mockGetTaskDto);

      expect(result.total).toEqual(mockGetTaskResponseDto.total);
    });
  });

  describe('findOne', () => {
    it('should be successful', async () => {
      mockRepository.findOne.mockResolvedValue(mockTask);
      const result = await service.findOne(mockTask.id);

      expect(result.id).toEqual(mockTask.id);
    });

    it('should be throw NotFoundException', async () => {
      mockRepository.findOne.mockResolvedValue(undefined);

      await expect(service.findOne(mockTask.id)).rejects.toThrow(
        mockNotFoundException,
      );
    });
  });
});
