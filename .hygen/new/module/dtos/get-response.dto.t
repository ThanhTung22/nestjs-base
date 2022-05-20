---
to: "src/modules/<%= h.fileName(name) %>/dtos/<%= h.getResponseDtoFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !blocks.includes('getResponseDto') %>
---
<%
 interfaceFileName = h.interfaceFileName(name);
%>
<%
 interfaceClassName = h.interfaceClassName(name);
 getResponseDtoClassName = h.getResponseDtoClassName(name);
%>
import { <%= interfaceClassName %> } from '../<%= interfaceFileName %>';

export class <%= getResponseDtoClassName %> implements <%= interfaceClassName %> {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

