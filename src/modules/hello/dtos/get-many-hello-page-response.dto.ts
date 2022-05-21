import { PageResponseDto } from '../../../common/base/dtos/page-response.dto';
import { GetHelloResponseDto } from './get-hello-response.dto';

export class GetPageHelloResponseDto extends PageResponseDto {
  data: GetHelloResponseDto[];
}
