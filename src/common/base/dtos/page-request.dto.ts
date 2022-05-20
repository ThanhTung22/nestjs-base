import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsOptional, IsPositive, IsString } from 'class-validator';

export class PageRequestDto {
  @ApiProperty({ default: 1 })
  @Type(() => Number)
  @IsPositive()
  @IsDefined()
  page: number;

  @ApiProperty({ default: 10 })
  @Type(() => Number)
  @IsPositive()
  @IsDefined()
  limit: number;

  @IsOptional()
  @IsString()
  search?: string;
}
