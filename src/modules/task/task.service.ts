import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { FindConditions, Like, Repository } from 'typeorm';
import { IPagination } from '../../common/interfaces/common.interface';
import { dayjs } from '../../common/utils/dayjs.util';
import { calculateSkipPagination } from '../../common/utils/pagination.util';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTaskDto } from './dtos/get-tasks.dto';
import { Status, TaskMessage } from './task.constant';
import { Task } from './task.entity';
import { ITask } from './task.interface';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly repository: Repository<Task>,
    @InjectPinoLogger(TaskService.name) private readonly logger: PinoLogger,
    private readonly httpService: HttpService,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<ITask> {
    this.logger.info({ createTaskDto });
    return this.repository.save(createTaskDto);
  }

  async findAll(getTaskDto: GetTaskDto): Promise<IPagination<ITask>> {
    const { limit, page, search, status } = getTaskDto;
    const whereConditions: FindConditions<ITask> = {};

    if (search) {
      whereConditions.name = Like(`%${search}%`);
    }

    if (status) {
      whereConditions.status = Status.TODO;
    }

    const [tasks, total] = <[ITask[], number]>(
      await this.repository.findAndCount({
        take: limit,
        skip: calculateSkipPagination(page, limit),
        where: whereConditions,
      })
    );

    return {
      data: tasks,
      total,
      page,
      limit,
    };
  }

  async findOne(id: number): Promise<ITask> {
    const task: ITask = await this.repository.findOne({ id });

    if (!task) {
      throw new HttpException(
        { key: TaskMessage.NOT_FOUND, args: { id } },
        HttpStatus.NOT_FOUND,
      );
    }

    return task;
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
