import { PartialType } from '@nestjs/swagger';
import { CreateBillPaymentDto } from './create-bill-payment.dto';

export class UpdateBillPaymentDto extends PartialType(CreateBillPaymentDto) {}
