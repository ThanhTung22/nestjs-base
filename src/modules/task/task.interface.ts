import { IAudit } from '../../common/base/interfaces/audit.interface';
import { TaskStatus } from './task.constant';

export interface ITask extends IAudit {
  name: string;
  description: string;
  status: TaskStatus;
}
