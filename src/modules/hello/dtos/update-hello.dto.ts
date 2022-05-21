import { PartialType } from '@nestjs/swagger';
import { CreateHelloDto } from './create-hello.dto';

export class UpdateHelloDto extends PartialType(CreateHelloDto) {}
