---
to: "src/modules/<%= h.fileName(name) %>/dtos/<%= h.getRequestDtoFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !blocks.includes('getRequestDto') %>
---
<%
 getRequestDtoClassName = h.getRequestDtoClassName(name);
%>
import { PageRequestDto } from '../../../common/base/dtos/page-request.dto';

export class <%= getRequestDtoClassName %> extends PageRequestDto {}

