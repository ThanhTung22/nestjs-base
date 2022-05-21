---
to: "src/modules/<%= h.fileName(name) %>/<%= h.interfaceFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !blocks.includes('interface') %>
---
<%
 interfaceClassName = h.interfaceClassName(name);
%>
import { IAudit } from '../../common/base/interfaces/audit.interface';

export interface <%= interfaceClassName %> extends IAudit {
  title: string;
}
