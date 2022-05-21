import { Column, Entity } from 'typeorm';
import { AuditEntity } from '../../common/base/entities/audit.entity';

@Entity()
export class HelloEntity extends AuditEntity {
  @Column()
  title: string;
}
