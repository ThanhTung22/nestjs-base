import { HttpException, HttpStatus } from '@nestjs/common';
import { uuid } from '../../common/utils/comon.util';
import { CreateHelloDto } from './dtos/create-hello.dto';
import { GetHelloRequestDto } from './dtos/get-hello-request.dto';
import { HelloConstant } from './hello.constant';
import { IHello } from './hello.interface';
import { GetPageHelloResponseDto } from './dtos/get-many-hello-page-response.dto';

const date = new Date();

export const mockHello: IHello = {
  id: uuid(),
  title: 'title',
  createdAt: date,
  updatedAt: date,
};

export const mockCreateHelloDto: CreateHelloDto = {
  title: 'title',
};

export const mockGetHelloRequestDto: GetHelloRequestDto = {
  page: 1,
  limit: 10,
  search: 'title',
};

export const mockGetPageHelloResponseDto: GetPageHelloResponseDto = {
  page: 1,
  limit: 10,
  total: 100,
  data: [mockHello],
};

export const mockFindAndCountRes = [
  mockGetPageHelloResponseDto.data,
  mockGetPageHelloResponseDto.total,
];

export const mockNotFoundException = new HttpException(
  { key: HelloConstant.NOT_FOUND },
  HttpStatus.NOT_FOUND,
);
