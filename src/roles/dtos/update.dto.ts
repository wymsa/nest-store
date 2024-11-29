import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @IsString()
  @IsOptional()
  name?: string;
}
