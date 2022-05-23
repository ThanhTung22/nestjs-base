---
to: "src/modules/<%= h.fileName(name) %>/<%= h.mockFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !blocks.includes('mock') %>
---
<%
 createDtoFileName = h.createDtoFileName(name);
 getRequestDtoFileName = h.getRequestDtoFileName(name);
 constantFileName = h.constantFileName(name);
 interfaceFileName = h.interfaceFileName(name);
 getPageResponseDtoFileName = h.getPageResponseDtoFileName(name);
 updateDtoFileName = h.updateDtoFileName(name);
%>
<%
 className = h.className(name);
 createDtoClassName = h.createDtoClassName(name);
 constantClassName = h.constantClassName(name);
 getRequestDtoClassName = h.getRequestDtoClassName(name);
 interfaceClassName = h.interfaceClassName(name);
 getPageResponseDtoClassName = h.getPageResponseDtoClassName(name);
 updateDtoClassName = h.updateDtoClassName(name);
%>
import { HttpException, HttpStatus } from '@nestjs/common';
import { uuid } from '../../common/utils/comon.util';
import { <%= createDtoClassName %> } from './dtos/<%= createDtoFileName %>';
import { <%= getRequestDtoClassName %> } from './dtos/<%= getRequestDtoFileName %>';
import { <%= constantClassName %> } from './<%= constantFileName %>';
import { <%= interfaceClassName %> } from './<%= interfaceFileName %>';
import { <%= getPageResponseDtoClassName %> } from './dtos/<%= getPageResponseDtoFileName %>';
import { <%= updateDtoClassName %> } from './dtos/<%= updateDtoFileName %>';

const date = new Date();

export const mock<%= className %>: <%= interfaceClassName %> = {
  id: uuid(),
  title: 'title',
  createdAt: date,
  updatedAt: date,
};

export const mock<%= createDtoClassName %>: <%= createDtoClassName %> = {
  title: 'title',
};

export const mock<%= getRequestDtoClassName %>: <%= getRequestDtoClassName %> = {
  page: 1,
  limit: 10,
  search: 'title',
};

export const mock<%= getPageResponseDtoClassName %>: <%= getPageResponseDtoClassName %> = {
  page: 1,
  limit: 10,
  total: 100,
  data: [mock<%= className %>],
};

export const mock<%= updateDtoClassName %>: <%= updateDtoClassName %> = {
  title: 'title update',
};

export const mockFindAndCount<%= className %> = [
  mock<%= getPageResponseDtoClassName %>.data,
  mock<%= getPageResponseDtoClassName %>.total,
];

export const mock<%= className %>NotFoundException = new HttpException(
  { key: <%= constantClassName %>.NOT_FOUND },
  HttpStatus.NOT_FOUND,
);

