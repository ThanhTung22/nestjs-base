---
to: "src/modules/<%= h.fileName(name) %>/<%= h.moduleFileName(name) %>.ts"
unless_exists: true
---
<%
 entityFileName = h.entityFileName(name);
 serviceFileName = h.serviceFileName(name);
 controllerFileName = h.controllerFileName(name);
%>
<%
 entityClassName = h.entityClassName(name);
 serviceClassName = h.serviceClassName(name);
 controllerClassName = h.controllerClassName(name);
 moduleClassName = h.moduleClassName(name);
%>
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { <%= entityClassName %> } from './<%= entityFileName %>';
import { <%= serviceClassName %> } from './<%= serviceFileName %>';
import { <%= controllerClassName %> } from './<%= controllerFileName %>';

@Module({
  imports: [TypeOrmModule.forFeature([<%= entityClassName %>]), HttpModule],
  controllers: [<%= controllerClassName %>],
  providers: [<%= serviceClassName %>],
})
export class <%= moduleClassName %> {}
