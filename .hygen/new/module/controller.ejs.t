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
 entityPluralName = h.entityPluralName(name);
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

@ApiTags('<%= entityPluralName %>')
@Controller('<%= entityPluralName %>')
export class <%= controllerClassName %> {
  constructor(private readonly service: <%= serviceClassName %>) {}

  @Post()
  @ApiCreatedResponse({ type: <%= getResponseDtoClassName %> })
  create(@Body() dto: <%= createDtoClassName %>) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOkResponse({ type: <%= getPageResponseDtoClassName %> })
  findAll(@Query() request: <%= getRequestDtoClassName %>) {
    return this.service.findAll(request);
  }

  @Get(':id')
  @ApiOkResponse({ type: <%= getResponseDtoClassName %> })
  findOne(@UUIDParam('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse()
  update(@UUIDParam('id') id: string, @Body() dto: <%= updateDtoClassName %>) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOkResponse()
  delete(@UUIDParam('id') id: string) {
    return this.service.delete(id);
  }
}

