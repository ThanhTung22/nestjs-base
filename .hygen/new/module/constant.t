---
to: "src/modules/<%= h.fileName(name) %>/<%= h.constantFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !blocks.includes('constant') %>
---
<%
 constantClassName = h.constantClassName(name);
 variableName = h.variableName(name);
%>
export enum <%= constantClassName %> {
  NOT_FOUND = '<%= variableName %>.NOT_FOUND',
}


