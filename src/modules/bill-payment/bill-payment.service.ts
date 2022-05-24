import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { FindConditions, ILike, Repository } from 'typeorm';
import { calculateSkipPagination } from '../../common/utils/pagination.util';
import { IPagination } from '../../common/base/interfaces/pagination.interface';

import { CreateBillPaymentDto } from './dtos/create-bill-payment.dto';
import { GetBillPaymentRequestDto } from './dtos/get-bill-payment-request.dto';
import { BillPaymentConstant } from './bill-payment.constant';
import { BillPaymentEntity } from './bill-payment.entity';
import { IBillPayment } from './bill-payment.interface';
import { UpdateBillPaymentDto } from './dtos/update-bill-payment.dto';

@Injectable()
export class BillPaymentService {
  constructor(
    @InjectRepository(BillPaymentEntity)
    private readonly repository: Repository<BillPaymentEntity>,
    @InjectPinoLogger(BillPaymentService.name)
    private readonly logger: PinoLogger,
  ) {}
  async create(dto: CreateBillPaymentDto): Promise<IBillPayment> {
    this.logger.info({ dto });
    return this.repository.save(dto);
  }

  async findAll(
    request: GetBillPaymentRequestDto,
  ): Promise<IPagination<IBillPayment>> {
    const { limit, page, search } = request;
    const whereConditions: FindConditions<IBillPayment> = {};

    if (search) {
      whereConditions.title = ILike(`%${search}%`);
    }

    const [data, total] = <[IBillPayment[], number]>(
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

  async findOne(id: string): Promise<IBillPayment> {
    const entity: IBillPayment = await this.repository.findOne({ id });

    if (!entity) {
      throw new HttpException(
        { key: BillPaymentConstant.NOT_FOUND, args: { id } },
        HttpStatus.NOT_FOUND,
      );
    }

    return entity;
  }

  async update(id: string, dto: UpdateBillPaymentDto): Promise<void> {
    await this.findOne(id);

    await this.repository.update({ id }, dto);
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);

    await this.repository.delete({ id });
  }
}
