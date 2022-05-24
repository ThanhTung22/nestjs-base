import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { getLoggerToken } from 'nestjs-pino';
import { BillPaymentEntity } from './bill-payment.entity';
import {
  mockBillPayment,
  mockCreateBillPaymentDto,
  mockGetPageBillPaymentResponseDto,
  mockGetBillPaymentRequestDto,
  mockUpdateBillPaymentDto,
  mockFindAndCountBillPayment,
  mockBillPaymentNotFoundException,
} from './bill-payment.mock';
import { BillPaymentService } from './bill-payment.service';

describe('BillPaymentService', () => {
  let service: BillPaymentService;
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
        BillPaymentService,
        { provide: HttpService, useValue: mockHttpService },
        {
          provide: getRepositoryToken(BillPaymentEntity),
          useValue: mockRepository,
        },
        {
          provide: getLoggerToken(BillPaymentService.name),
          useValue: mockLogger,
        },
      ],
    }).compile();

    service = module.get<BillPaymentService>(BillPaymentService);
  });

  describe('create', () => {
    it('should be successful', async () => {
      mockRepository.save.mockResolvedValue(mockBillPayment);
      const result = await service.create(mockCreateBillPaymentDto);

      expect(result.id).toEqual(mockBillPayment.id);
    });
  });

  describe('findAll', () => {
    it('should be successful', async () => {
      mockRepository.findAndCount.mockResolvedValue(
        mockFindAndCountBillPayment,
      );
      const result = await service.findAll(mockGetBillPaymentRequestDto);

      expect(result.total).toEqual(mockGetPageBillPaymentResponseDto.total);
    });
  });

  describe('findOne', () => {
    it('should be successful', async () => {
      mockRepository.findOne.mockResolvedValue(mockBillPayment);
      const result = await service.findOne(mockBillPayment.id);

      expect(result.id).toEqual(mockBillPayment.id);
    });

    it('should be throw NotFoundException', async () => {
      mockRepository.findOne.mockResolvedValue(undefined);

      await expect(service.findOne(mockBillPayment.id)).rejects.toThrow(
        mockBillPaymentNotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should be successful', async () => {
      mockRepository.findOne.mockResolvedValue(mockBillPayment);
      const mockUpdateFunction = jest.spyOn(service, 'update');
      await service.update(mockBillPayment.id, mockUpdateBillPaymentDto);

      expect(mockUpdateFunction).toBeCalledWith(
        mockBillPayment.id,
        mockUpdateBillPaymentDto,
      );
    });
  });

  describe('delete', () => {
    it('should be successful', async () => {
      mockRepository.findOne.mockResolvedValue(mockBillPayment);
      const mockDeleteFunction = jest.spyOn(service, 'delete');
      await service.delete(mockBillPayment.id);

      expect(mockDeleteFunction).toBeCalledWith(mockBillPayment.id);
    });
  });
});
