import { HttpException, HttpStatus } from '@nestjs/common';
import { uuid } from '../../common/utils/comon.util';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTaskRequestDto } from './dtos/get-task-request.dto';
import { TaskMessage, TaskStatus } from './task.constant';
import { ITask } from './task.interface';
import { GetPageTaskResponseDto } from './dtos/get-page-task-response.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';

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

export const mockUpdateTaskDto: UpdateTaskDto = {
  name: 'name update',
  description: 'description update',
  status: TaskStatus.DONE,
};

export const mockFindAndCountTask = [
  mockGetPageTaskResponseDto.data,
  mockGetPageTaskResponseDto.total,
];

export const mockTaskNotFoundException = new HttpException(
  { key: TaskMessage.NOT_FOUND },
  HttpStatus.NOT_FOUND,
);
