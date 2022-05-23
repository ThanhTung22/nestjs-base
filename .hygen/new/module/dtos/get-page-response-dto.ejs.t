---
to: "src/modules/<%= h.fileName(name) %>/dtos/<%= h.getPageResponseDtoFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !blocks.includes('getPageResponseDto') %>
---
<%
 getResponseDtoFileName = h.getResponseDtoFileName(name);
%>
<%
 getResponseDtoClassName = h.getResponseDtoClassName(name);
 getPageResponseDtoClassName = h.getPageResponseDtoClassName(name);
%>
import { PageResponseDto } from '../../../common/base/dtos/page-response.dto';
import { <%= getResponseDtoClassName %> } from './<%= getResponseDtoFileName %>';

export class <%= getPageResponseDtoClassName %> extends PageResponseDto {
  data: <%= getResponseDtoClassName %>[];
}

