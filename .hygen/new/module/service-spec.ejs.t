---
to: "src/modules/<%= h.fileName(name) %>/<%= h.serviceSpecFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !blocks.includes('serviceSpec') %>
---
<%
 entityFileName = h.entityFileName(name);
 mockFileName = h.mockFileName(name);
 serviceFileName = h.serviceFileName(name);
%>
<%
 entityClassName = h.entityClassName(name);
 className = h.className(name);
 createDtoClassName = h.createDtoClassName(name);
 getPageResponseDtoClassName = h.getPageResponseDtoClassName(name);
 getRequestDtoClassName = h.getRequestDtoClassName(name);
 serviceClassName = h.serviceClassName(name);
%>
import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { getLoggerToken } from 'nestjs-pino';
import { <%= entityClassName %> } from './<%= entityFileName %>';
import {
  mock<%= className %>,
  mock<%= createDtoClassName %>,
  mock<%= getPageResponseDtoClassName %>,
  mock<%= getRequestDtoClassName %>,
  mock<%= updateDtoClassName %>,
  mockFindAndCount<%= className %>,
  mock<%= className %>NotFoundException,
} from './<%= mockFileName %>';
import { <%= serviceClassName %> } from './<%= serviceFileName %>';

describe('<%= serviceClassName %>', () => {
  let service: <%= serviceClassName %>;
  const mockHttpService = {};
  const mockRepository = {
    save: jest.fn(),
    findAndCount: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
  const mockLogger = {
    info: jest.fn(),
    error: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        <%= serviceClassName %>,
        { provide: HttpService, useValue: mockHttpService },
        { provide: getRepositoryToken(<%= entityClassName %>), useValue: mockRepository },
        { provide: getLoggerToken(<%= serviceClassName %>.name), useValue: mockLogger },
      ],
    }).compile();

    service = module.get<<%= serviceClassName %>>(<%= serviceClassName %>);
  });

  describe('create', () => {
    it('should be successful', async () => {
      mockRepository.save.mockResolvedValue(mock<%= className %>);
      const result = await service.create(mock<%= createDtoClassName %>);

      expect(result.id).toEqual(mock<%= className %>.id);
    });
  });

  describe('findAll', () => {
    it('should be successful', async () => {
      mockRepository.findAndCount.mockResolvedValue(mockFindAndCount<%= className %>);
      const result = await service.findAll(mock<%= getRequestDtoClassName %>);

      expect(result.total).toEqual(mock<%= getPageResponseDtoClassName %>.total);
    });
  });

  describe('findOne', () => {
    it('should be successful', async () => {
      mockRepository.findOne.mockResolvedValue(mock<%= className %>);
      const result = await service.findOne(mock<%= className %>.id);

      expect(result.id).toEqual(mock<%= className %>.id);
    });

    it('should be throw NotFoundException', async () => {
      mockRepository.findOne.mockResolvedValue(undefined);

      await expect(service.findOne(mock<%= className %>.id)).rejects.toThrow(
        mock<%= className %>NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should be successful', async () => {
      mockRepository.findOne.mockResolvedValue(mock<%= className %>);
      const mockUpdateFunction = jest.spyOn(service, 'update');
      await service.update(mock<%= className %>.id, mock<%= updateDtoClassName %>);

      expect(mockUpdateFunction).toBeCalledWith(mock<%= className %>.id, mock<%= updateDtoClassName %>);
    });
  });

  describe('delete', () => {
    it('should be successful', async () => {
      mockRepository.findOne.mockResolvedValue(mock<%= className %>);
      const mockDeleteFunction = jest.spyOn(service, 'delete');
      await service.delete(mock<%= className %>.id);

      expect(mockDeleteFunction).toBeCalledWith(mock<%= className %>.id);
    });
  });
});
