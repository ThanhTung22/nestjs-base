---
to: "src/modules/<%= h.fileName(name) %>/dtos/<%= h.createDtoFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !blocks.includes('interface') %>
---
<%

 CreateDtoName = h.createDtoClassName(name);

%>export class <%= CreateDtoName %> {}
