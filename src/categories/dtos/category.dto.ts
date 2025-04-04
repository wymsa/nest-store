import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class CategoryDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateCategoryDTO extends PartialType(CategoryDTO) {}
