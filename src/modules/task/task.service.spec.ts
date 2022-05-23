import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { getLoggerToken } from 'nestjs-pino';
import { TaskEntity } from './task.entity';
import {
  mockTask,
  mockCreateTaskDto,
  mockGetPageTaskResponseDto,
  mockGetTaskRequestDto,
  mockUpdateTaskDto,
  mockFindAndCountTask,
  mockTaskNotFoundException,
} from './task.mock';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;
  const mockHttpService = {};
  const mockRepository = {
    save: jest.fn(),
    findAndCount: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
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
        { provide: getRepositoryToken(TaskEntity), useValue: mockRepository },
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
      mockRepository.findAndCount.mockResolvedValue(mockFindAndCountTask);
      const result = await service.findAll(mockGetTaskRequestDto);

      expect(result.total).toEqual(mockGetPageTaskResponseDto.total);
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
        mockTaskNotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should be successful', async () => {
      mockRepository.findOne.mockResolvedValue(mockTask);
      const mockUpdateFunction = jest.spyOn(service, 'update');
      await service.update(mockTask.id, mockUpdateTaskDto);

      expect(mockUpdateFunction).toBeCalledWith(mockTask.id, mockUpdateTaskDto);
    });
  });

  describe('delete', () => {
    it('should be successful', async () => {
      mockRepository.findOne.mockResolvedValue(mockTask);
      const mockDeleteFunction = jest.spyOn(service, 'delete');
      await service.delete(mockTask.id);

      expect(mockDeleteFunction).toBeCalledWith(mockTask.id);
    });
  });
});
