---
to: "src/modules/<%= h.fileName(name) %>/dtos/<%= h.createDtoFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !blocks.includes('serviceSpec') %>
---
<%

 CreateDtoName = h.createDtoClassName(name);

%>export class <%= CreateDtoName %> {}
