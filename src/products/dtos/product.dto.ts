import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { TransformToIntArray } from 'src/common/decorators/transform-to-int.decorator';

export class ProductDTO {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsNumber()
  @Type(() => Number)
  categoryID: number;
}

export class UpdateProductDTO extends PartialType(ProductDTO) {}

export class ProductFilterDTO {
  @IsArray()
  @IsInt({ each: true })
  @TransformToIntArray()
  @IsOptional()
  categoryIDs?: number[];
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  take?: number;
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  skip?: number;
}
