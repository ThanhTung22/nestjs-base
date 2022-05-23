---
to: "src/modules/<%= h.fileName(name) %>/<%= h.serviceFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !blocks.includes('service') %>
---
<%
 createDtoFileName = h.createDtoFileName(name);
 getRequestDtoFileName = h.getRequestDtoFileName(name);
 constantFileName = h.constantFileName(name);
 entityFileName = h.entityFileName(name);
 interfaceFileName = h.interfaceFileName(name);
 updateDtoFileName = h.updateDtoFileName(name);
%>
<%
 createDtoClassName = h.createDtoClassName(name);
 getRequestDtoClassName = h.getRequestDtoClassName(name);
 constantClassName = h.constantClassName(name);
 entityClassName = h.entityClassName(name);
 interfaceClassName = h.interfaceClassName(name);
 updateDtoClassName = h.updateDtoClassName(name);
 serviceClassName = h.serviceClassName(name);
%>
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { FindConditions, ILike, Repository } from 'typeorm';
import { calculateSkipPagination } from '../../common/utils/pagination.util';
import { IPagination } from '../../common/base/interfaces/pagination.interface';

import { <%= createDtoClassName %> } from './dtos/<%= createDtoFileName %>';
import { <%= getRequestDtoClassName %> } from './dtos/<%= getRequestDtoFileName %>';
import { <%= constantClassName %> } from './<%= constantFileName %>';
import { <%= entityClassName %> } from './<%= entityFileName %>';
import { <%= interfaceClassName %> } from './<%= interfaceFileName %>';
import { <%= updateDtoClassName %> } from './dtos/<%= updateDtoFileName %>';


@Injectable()
export class <%= serviceClassName %> {
  constructor(
    @InjectRepository(<%= entityClassName %>)
    private readonly repository: Repository<<%= entityClassName %>>,
    @InjectPinoLogger(<%= serviceClassName %>.name)
    private readonly logger: PinoLogger,
  ) {}
  async create(dto: <%= createDtoClassName %>): Promise<<%= interfaceClassName %>> {
    this.logger.info({ dto });
    return this.repository.save(dto);
  }

  async findAll(request: <%= getRequestDtoClassName %>): Promise<IPagination<<%= interfaceClassName %>>> {
    const { limit, page, search } = request;
    const whereConditions: FindConditions<<%= interfaceClassName %>> = {};

    if (search) {
      whereConditions.title = ILike(`%${search}%`);
    }

    const [data, total] = <[<%= interfaceClassName %>[], number]>(
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

  async findOne(id: string): Promise<<%= interfaceClassName %>> {
    const entity: <%= interfaceClassName %> = await this.repository.findOne({ id });

    if (!entity) {
      throw new HttpException(
        { key: <%= constantClassName %>.NOT_FOUND, args: { id } },
        HttpStatus.NOT_FOUND,
      );
    }

    return entity;
  }

  async update(id: string, dto: <%= updateDtoClassName %>): Promise<void> {
    await this.findOne(id);

    await this.repository.update({ id }, dto);
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);

    await this.repository.delete({ id });
  }
}
