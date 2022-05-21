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
import { HelloService } from './hello.service';
import { CreateHelloDto } from './dtos/create-hello.dto';
import { GetHelloRequestDto } from './dtos/get-hello-request.dto';
import { UpdateHelloDto } from './dtos/update-hello.dto';
import { GetHelloResponseDto } from './dtos/get-hello-response.dto';
import { GetPageHelloResponseDto } from './dtos/get-many-hello-page-response.dto';

@ApiTags('hellos')
@Controller('hellos')
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @Post()
  @ApiCreatedResponse({ type: GetHelloResponseDto })
  create(@Body() dto: CreateHelloDto) {
    return this.helloService.create(dto);
  }

  @Get()
  @ApiOkResponse({ type: GetPageHelloResponseDto })
  findAll(@Query() request: GetHelloRequestDto) {
    return this.helloService.findAll(request);
  }

  @Get(':id')
  @ApiOkResponse({ type: GetHelloResponseDto })
  findOne(@UUIDParam('id') id: string) {
    return this.helloService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: GetHelloResponseDto })
  update(@UUIDParam('id') id: string, @Body() dto: UpdateHelloDto) {
    return this.helloService.update(id, dto);
  }

  @Delete(':id')
  @ApiOkResponse()
  remove(@UUIDParam('id') id: string) {
    return this.helloService.remove(id);
  }
}
