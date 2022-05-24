import { PageResponseDto } from '../../../common/base/dtos/page-response.dto';
import { GetBillPaymentResponseDto } from './get-bill-payment-response.dto';

export class GetPageBillPaymentResponseDto extends PageResponseDto {
  data: GetBillPaymentResponseDto[];
}
