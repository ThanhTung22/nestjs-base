import { Status } from '../task.constant';
import { ITask } from '../task.interface';

export class GetTaskResponseDto implements ITask {
  id: number;
  name: string;
  description: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}
