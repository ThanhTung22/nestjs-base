import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../task.constant';
import { PageRequestDto } from '../../../common/base/dtos/page-request.dto';

export class GetTaskRequestDto extends PageRequestDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
