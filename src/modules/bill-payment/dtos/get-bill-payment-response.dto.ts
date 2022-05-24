import { IBillPayment } from '../bill-payment.interface';

export class GetBillPaymentResponseDto implements IBillPayment {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}
