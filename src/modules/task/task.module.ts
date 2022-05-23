import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { TaskEntity } from './task.entity';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity]), HttpModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
