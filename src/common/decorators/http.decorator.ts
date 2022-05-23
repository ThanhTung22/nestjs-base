import { Param, ParseUUIDPipe, PipeTransform, Type } from '@nestjs/common';
import { DEFAULT_UUID_VERSION } from '../constants/common.constant';

export function UUIDParam(
  property: string,
  ...pipes: Array<Type<PipeTransform> | PipeTransform>
): ParameterDecorator {
  return Param(
    property,
    new ParseUUIDPipe({ version: DEFAULT_UUID_VERSION }),
    ...pipes,
  );
}
