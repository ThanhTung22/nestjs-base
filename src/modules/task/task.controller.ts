import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetTaskResponseDto } from './dtos/get-task-response.dto';
import { GetTaskDto, GetTasksResponseDto } from './dtos/get-tasks.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly tasksService: TaskService) {}

  @ApiOkResponse({ type: GetTaskResponseDto })
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @ApiOkResponse({ type: GetTasksResponseDto })
  @Get()
  findAll(@Query() getTaskDto: GetTaskDto) {
    return this.tasksService.findAll(getTaskDto);
  }

  @ApiOkResponse({ type: GetTaskResponseDto })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }
}
