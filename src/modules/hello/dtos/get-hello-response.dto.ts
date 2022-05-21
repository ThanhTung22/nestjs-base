import { IHello } from '../hello.interface';

export class GetHelloResponseDto implements IHello {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}
