import { PageResponseDto } from '../../../common/base/dtos/page-response.dto';
import { GetTaskResponseDto } from './get-task-response.dto';

export class GetPageTaskResponseDto extends PageResponseDto {
  data: GetTaskResponseDto[];
}
