import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTaskRequestDto } from './dtos/get-task-request.dto';
import { TaskStatus, TaskMessage } from './task.constant';
import { ITask } from './task.interface';
import { uuid } from '../../common/utils/comon.util';
import { GetPageTaskResponseDto } from './dtos/get-page-task-response.dto';

const date = new Date();

export const mockTask: ITask = {
  id: uuid(),
  name: 'name',
  description: 'description',
  status: TaskStatus.TODO,
  createdAt: date,
  updatedAt: date,
};

export const mockCreateTaskDto: CreateTaskDto = {
  name: 'name',
  description: 'description',
};

export const mockGetTaskRequestDto: GetTaskRequestDto = {
  page: 1,
  limit: 10,
  search: 'name',
  status: TaskStatus.TODO,
};

export const mockGetPageTaskResponseDto: GetPageTaskResponseDto = {
  page: 1,
  limit: 10,
  total: 100,
  data: [mockTask],
};

export const mockFindAndCountRes = [
  mockGetPageTaskResponseDto.data,
  mockGetPageTaskResponseDto.total,
];

export const mockNotFoundException = new HttpException(
  { key: TaskMessage.NOT_FOUND },
  HttpStatus.NOT_FOUND,
);
