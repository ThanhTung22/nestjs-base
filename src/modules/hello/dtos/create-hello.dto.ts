import { IsNotEmpty, IsString } from 'class-validator';
import { IHello } from '../hello.interface';

export class CreateHelloDto implements Pick<IHello, 'title'> {
  @IsString()
  @IsNotEmpty()
  title: string;
}
