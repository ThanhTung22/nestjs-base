---
to: "src/modules/<%= h.fileName(name) %>/<%= h.controllerFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !blocks.includes('controller') %>
---
<%
 fileName = h.fileName(name);
 serviceFileName = h.serviceFileName(name);
 createDtoFileName = h.createDtoFileName(name);
 getRequestDtoFileName = h.getRequestDtoFileName(name);
 updateDtoFileName = h.updateDtoFileName(name);
 getResponseDtoFileName = h.getResponseDtoFileName(name);
 getPageResponseDtoFileName = h.getPageResponseDtoFileName(name);
%>
<%
 serviceClassName = h.serviceClassName(name);
 createDtoClassName = h.createDtoClassName(name);
 getRequestDtoClassName = h.getRequestDtoClassName(name);
 updateDtoClassName = h.updateDtoClassName(name);
 getResponseDtoClassName = h.getResponseDtoClassName(name);
 getPageResponseDtoClassName = h.getPageResponseDtoClassName(name);

 controllerClassName = h.controllerClassName(name);
 serviceVariableName = h.serviceVariableName(name);
%>


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
import { <%= serviceClassName %> } from './<%= serviceFileName %>';
import { <%= createDtoClassName %> } from './dtos/<%= createDtoFileName %>';
import { <%= getRequestDtoClassName %> } from './dtos/<%= getRequestDtoFileName %>';
import { <%= updateDtoClassName %> } from './dtos/<%= updateDtoFileName %>';
import { <%= getResponseDtoClassName %> } from './dtos/<%= getResponseDtoFileName %>';
import { <%= getPageResponseDtoClassName %> } from './dtos/<%= getPageResponseDtoFileName %>';

@ApiTags('<%= fileName %>s')
@Controller('<%= fileName %>s')
export class <%= controllerClassName %> {
  constructor(private readonly <%= serviceVariableName %>: <%= serviceClassName %>) {}

  @Post()
  @ApiCreatedResponse({ type: <%= getResponseDtoClassName %> })
  create(@Body() dto: <%= createDtoClassName %>) {
    return this.<%= serviceVariableName %>.create(dto);
  }

  @Get()
  @ApiOkResponse({ type: <%= getPageResponseDtoClassName %> })
  findAll(@Query() request: <%= getRequestDtoClassName %>) {
    return this.<%= serviceVariableName %>.findAll(request);
  }

  @Get(':id')
  @ApiOkResponse({ type: <%= getResponseDtoClassName %> })
  findOne(@UUIDParam('id') id: string) {
    return this.<%= serviceVariableName %>.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: <%= getResponseDtoClassName %> })
  update(@UUIDParam('id') id: string, @Body() dto: <%= updateDtoClassName %>) {
    return this.<%= serviceVariableName %>.update(id, dto);
  }

  @Delete(':id')
  @ApiOkResponse()
  remove(@UUIDParam('id') id: string) {
    return this.<%= serviceVariableName %>.remove(id);
  }
}

