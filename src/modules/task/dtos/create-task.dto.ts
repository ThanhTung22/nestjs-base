import { IsNotEmpty, IsString } from 'class-validator';
import { ITask } from '../task.interface';

export class CreateTaskDto implements Pick<ITask, 'name' | 'description'> {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
