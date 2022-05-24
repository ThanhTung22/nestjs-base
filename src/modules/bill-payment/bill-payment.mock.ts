import { HttpException, HttpStatus } from '@nestjs/common';
import { uuid } from '../../common/utils/comon.util';
import { CreateBillPaymentDto } from './dtos/create-bill-payment.dto';
import { GetBillPaymentRequestDto } from './dtos/get-bill-payment-request.dto';
import { BillPaymentConstant } from './bill-payment.constant';
import { IBillPayment } from './bill-payment.interface';
import { GetPageBillPaymentResponseDto } from './dtos/get-page-bill-payment-page-response.dto';
import { UpdateBillPaymentDto } from './dtos/update-bill-payment.dto';

const date = new Date();

export const mockBillPayment: IBillPayment = {
  id: uuid(),
  title: 'title',
  createdAt: date,
  updatedAt: date,
};

export const mockCreateBillPaymentDto: CreateBillPaymentDto = {
  title: 'title',
};

export const mockGetBillPaymentRequestDto: GetBillPaymentRequestDto = {
  page: 1,
  limit: 10,
  search: 'title',
};

export const mockGetPageBillPaymentResponseDto: GetPageBillPaymentResponseDto =
  {
    page: 1,
    limit: 10,
    total: 100,
    data: [mockBillPayment],
  };

export const mockUpdateBillPaymentDto: UpdateBillPaymentDto = {
  title: 'title update',
};

export const mockFindAndCountBillPayment = [
  mockGetPageBillPaymentResponseDto.data,
  mockGetPageBillPaymentResponseDto.total,
];

export const mockBillPaymentNotFoundException = new HttpException(
  { key: BillPaymentConstant.NOT_FOUND },
  HttpStatus.NOT_FOUND,
);
