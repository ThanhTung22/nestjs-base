import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { BillPaymentEntity } from './bill-payment.entity';
import { BillPaymentService } from './bill-payment.service';
import { BillPaymentController } from './bill-payment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BillPaymentEntity]), HttpModule],
  controllers: [BillPaymentController],
  providers: [BillPaymentService],
})
export class BillPaymentModule {}
