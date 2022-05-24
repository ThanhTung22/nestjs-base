import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UUIDParam } from '../../common/decorators/http.decorator';
import { BillPaymentService } from './bill-payment.service';
import { CreateBillPaymentDto } from './dtos/create-bill-payment.dto';
import { GetBillPaymentRequestDto } from './dtos/get-bill-payment-request.dto';
import { UpdateBillPaymentDto } from './dtos/update-bill-payment.dto';
import { GetBillPaymentResponseDto } from './dtos/get-bill-payment-response.dto';
import { GetPageBillPaymentResponseDto } from './dtos/get-page-bill-payment-page-response.dto';

@ApiTags('bill-payments')
@Controller('bill-payments')
export class BillPaymentController {
  constructor(private readonly service: BillPaymentService) {}

  @Post()
  @ApiCreatedResponse({ type: GetBillPaymentResponseDto })
  create(@Body() dto: CreateBillPaymentDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOkResponse({ type: GetPageBillPaymentResponseDto })
  findAll(@Query() request: GetBillPaymentRequestDto) {
    return this.service.findAll(request);
  }

  @Get(':id')
  @ApiOkResponse({ type: GetBillPaymentResponseDto })
  findOne(@UUIDParam('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse()
  update(@UUIDParam('id') id: string, @Body() dto: UpdateBillPaymentDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOkResponse()
  delete(@UUIDParam('id') id: string) {
    return this.service.delete(id);
  }
}
