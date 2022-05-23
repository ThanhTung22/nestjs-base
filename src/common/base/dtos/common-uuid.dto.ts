import { IsUUID } from 'class-validator';
import { DEFAULT_UUID_VERSION } from '../../constants/common.constant';

export class CommonUUIDDto {
  @IsUUID(DEFAULT_UUID_VERSION)
  id: string;
}
