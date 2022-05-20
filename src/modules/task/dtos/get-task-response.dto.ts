import { ITask } from '../task.interface';
import { TaskStatus } from '../task.constant';

export class GetTaskResponseDto implements ITask {
  id: string;
  name: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}
