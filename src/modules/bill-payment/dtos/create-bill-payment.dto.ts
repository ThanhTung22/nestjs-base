import { IsNotEmpty, IsString } from 'class-validator';
import { IBillPayment } from '../bill-payment.interface';

export class CreateBillPaymentDto implements Pick<IBillPayment, 'title'> {
  @IsString()
  @IsNotEmpty()
  title: string;
}
