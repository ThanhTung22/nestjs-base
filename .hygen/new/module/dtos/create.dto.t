---
to: "src/modules/<%= h.fileName(name) %>/dtos/<%= h.createDtoFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !blocks.includes('createDto') %>
---
<%
 interfaceFileName = h.interfaceFileName(name);
%>
<%
 createDtoClassName = h.createDtoClassName(name);
 interfaceClassName = h.interfaceClassName(name);
%>
import { IsNotEmpty, IsString } from 'class-validator';
import { <%= interfaceClassName %> } from '../<%= interfaceFileName %>';

export class <%= createDtoClassName %> implements Pick<<%= interfaceClassName %>, 'title'> {
  @IsString()
  @IsNotEmpty()
  title: string;
}
