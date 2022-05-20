---
to: "src/modules/<%= h.fileName(name) %>/dtos/<%= h.updateDtoFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !blocks.includes('updateDto') %>
---
<%
 interfaceFileName = h.interfaceFileName(name);
 createDtoFileName = h.createDtoFileName(name);
%>
<%
 createDtoClassName = h.createDtoClassName(name);
 updateDtoClassName = h.updateDtoClassName(name);
 interfaceClassName = h.interfaceClassName(name);
%>
import { PartialType } from '@nestjs/swagger';
import { <%= createDtoClassName %> } from './<%= createDtoFileName %>';

export class <%= updateDtoClassName %> extends PartialType(<%= createDtoClassName %>) {}

