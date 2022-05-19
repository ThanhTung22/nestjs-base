import { IsEnum, IsOptional } from 'class-validator';
import {
  CommonPaginationDto,
  CommonPaginationResponseDto,
} from '../../../common/dtos/pagination.dto';
import { Status } from '../task.constant';
import { GetTaskResponseDto } from './get-task-response.dto';

export class GetTaskDto extends CommonPaginationDto {
  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}

export class GetTasksResponseDto extends CommonPaginationResponseDto {
  data: GetTaskResponseDto[];
}
