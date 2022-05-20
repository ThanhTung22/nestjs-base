import { Column, Entity } from 'typeorm';
import { TaskStatus } from './task.constant';
import { AuditEntity } from '../../common/base/entities/audit.entity';

@Entity()
export class TaskEntity extends AuditEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ enum: TaskStatus, default: TaskStatus.TODO, type: 'enum' })
  status: TaskStatus;
}
