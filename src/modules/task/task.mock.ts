import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTaskDto, GetTasksResponseDto } from './dtos/get-tasks.dto';
import { Status } from './task.constant';
import { ITask } from './task.interface';

const date = new Date();

export const mockTask: ITask = {
  id: 1,
  name: 'name',
  description: 'description',
  status: Status.TODO,
  createdAt: date,
  updatedAt: date,
};

export const mockCreateTaskDto: CreateTaskDto = {
  name: 'name',
  description: 'description',
};

export const mockGetTaskDto: GetTaskDto = {
  page: 1,
  limit: 10,
  search: 'name',
  status: Status.TODO,
};

export const mockGetTaskResponseDto: GetTasksResponseDto = {
  page: 1,
  limit: 10,
  total: 100,
  data: [mockTask],
};

export const mockFindAndCountRes = [
  mockGetTaskResponseDto.data,
  mockGetTaskResponseDto.total,
];

export const mockNotFoundException = new HttpException(
  { key: 'cat.NOT_FOUND' },
  HttpStatus.NOT_FOUND,
);
