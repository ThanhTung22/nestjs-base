import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { FindConditions, ILike, Repository } from 'typeorm';
import { calculateSkipPagination } from '../../common/utils/pagination.util';
import { IPagination } from '../../common/base/interfaces/pagination.interface';
import { dayjs } from '../../common/utils/dayjs.util';

import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTaskRequestDto } from './dtos/get-task-request.dto';
import { TaskMessage, TaskStatus } from './task.constant';
import { TaskEntity } from './task.entity';
import { ITask } from './task.interface';
import { UpdateTaskDto } from './dtos/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly repository: Repository<TaskEntity>,
    @InjectPinoLogger(TaskService.name)
    private readonly logger: PinoLogger,
    private readonly httpService: HttpService,
  ) {}

  async create(dto: CreateTaskDto): Promise<ITask> {
    this.logger.info({ dto });
    return this.repository.save(dto);
  }

  async findAll(request: GetTaskRequestDto): Promise<IPagination<ITask>> {
    const { limit, page, search, status } = request;
    const whereConditions: FindConditions<ITask> = {};

    if (search) {
      whereConditions.name = ILike(`%${search}%`);
    }

    if (status) {
      whereConditions.status = TaskStatus.TODO;
    }

    const [data, total] = <[ITask[], number]>await this.repository.findAndCount(
      {
        take: limit,
        skip: calculateSkipPagination(page, limit),
        where: whereConditions,
      },
    );

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findOne(id: string): Promise<ITask> {
    const entity: ITask = await this.repository.findOne({ id });

    if (!entity) {
      throw new HttpException(
        { key: TaskMessage.NOT_FOUND, args: { id } },
        HttpStatus.NOT_FOUND,
      );
    }

    return entity;
  }

  async update(id: string, dto: UpdateTaskDto): Promise<void> {
    await this.findOne(id);

    await this.repository.update({ id }, dto);
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);

    await this.repository.delete({ id });
  }

  /**
   * Demo using @nestjs/axios - HttpModule
   */
  async getProducts() {
    try {
      const { data: products } = await this.httpService.axiosRef.get(
        'https://fakestoreapi.com/products?limit=5',
      );

      return products;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        { key: TaskMessage.NOT_FOUND },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  /**
   * Demo using dayjs
   */
  async demoUsingDayjs() {
    return dayjs().toISOString();
  }
}
