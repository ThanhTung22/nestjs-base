---
to: "src/modules/<%= h.fileName(name) %>/<%= h.entityFileName(name) %>.ts"
unless_exists: true
skip_if: <%= !blocks.includes('entity') %>
---
<%
 entityClassName = h.entityClassName(name);
 fileName = h.fileName(name);
%>
import { Column, Entity } from 'typeorm';
import { AuditEntity } from '../../common/base/entities/audit.entity';

@Entity({ name: '<%= fileName %>' })
export class <%= entityClassName %> extends AuditEntity {
  @Column()
  title: string;
}

