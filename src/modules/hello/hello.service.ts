import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { FindConditions, ILike, Repository } from 'typeorm';
import { calculateSkipPagination } from '../../common/utils/pagination.util';
import { IPagination } from '../../common/base/interfaces/pagination.interface';

import { CreateHelloDto } from './dtos/create-hello.dto';
import { GetHelloRequestDto } from './dtos/get-hello-request.dto';
import { HelloConstant } from './hello.constant';
import { HelloEntity } from './hello.entity';
import { IHello } from './hello.interface';
import { UpdateHelloDto } from './dtos/update-hello.dto';

@Injectable()
export class HelloService {
  constructor(
    @InjectRepository(HelloEntity)
    private readonly repository: Repository<HelloEntity>,
    @InjectPinoLogger(HelloService.name)
    private readonly logger: PinoLogger,
  ) {}
  async create(dto: CreateHelloDto): Promise<IHello> {
    this.logger.info({ dto });
    return this.repository.save(dto);
  }

  async findAll(request: GetHelloRequestDto): Promise<IPagination<IHello>> {
    const { limit, page, search } = request;
    const whereConditions: FindConditions<HelloEntity> = {};

    if (search) {
      whereConditions.title = ILike(`%${search}%`);
    }

    const [data, total] = <[HelloEntity[], number]>(
      await this.repository.findAndCount({
        take: limit,
        skip: calculateSkipPagination(page, limit),
        where: whereConditions,
      })
    );

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findOne(id: string): Promise<HelloEntity> {
    const entity: HelloEntity = await this.repository.findOne({ id });

    if (!entity) {
      throw new HttpException(
        { key: HelloConstant.NOT_FOUND, args: { id } },
        HttpStatus.NOT_FOUND,
      );
    }

    return entity;
  }

  async update(id: string, dto: UpdateHelloDto): Promise<IHello> {
    const exist: HelloEntity = await this.repository.findOne({ id });

    if (!exist) {
      throw new HttpException(
        { key: HelloConstant.NOT_FOUND, args: { id } },
        HttpStatus.NOT_FOUND,
      );
    }

    return this.repository.save({ ...dto, id });
  }

  async remove(id: string): Promise<void> {
    const exist: IHello = await this.repository.findOne({ id });

    if (!exist) {
      throw new HttpException(
        { key: HelloConstant.NOT_FOUND, args: { id } },
        HttpStatus.NOT_FOUND,
      );
    }

    await this.repository.remove(exist);
  }
}
