import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UUIDParam } from '../../common/decorators/http.decorator';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTaskRequestDto } from './dtos/get-task-request.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { GetTaskResponseDto } from './dtos/get-task-response.dto';
import { GetPageTaskResponseDto } from './dtos/get-page-task-response.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @Post()
  @ApiCreatedResponse({ type: GetTaskResponseDto })
  create(@Body() dto: CreateTaskDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOkResponse({ type: GetPageTaskResponseDto })
  findAll(@Query() request: GetTaskRequestDto) {
    return this.service.findAll(request);
  }

  @Get(':id')
  @ApiOkResponse({ type: GetTaskResponseDto })
  findOne(@UUIDParam('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse()
  update(@UUIDParam('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOkResponse()
  delete(@UUIDParam('id') id: string) {
    return this.service.delete(id);
  }
}
