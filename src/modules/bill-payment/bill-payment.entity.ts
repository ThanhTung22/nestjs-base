import { Column, Entity } from 'typeorm';
import { AuditEntity } from '../../common/base/entities/audit.entity';

@Entity({ name: 'bill-payment' })
export class BillPaymentEntity extends AuditEntity {
  @Column()
  title: string;
}
