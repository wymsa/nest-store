import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDTO, UpdateCategoryDTO } from './dtos/category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() createCategoryDto: CategoryDTO) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Patch(':categoryID')
  async update(
    @Param('categoryID', ParseIntPipe) categoryID: number,
    @Body() updateCategoryDto: UpdateCategoryDTO
  ) {
    return this.categoriesService.update(categoryID, updateCategoryDto);
  }

  @Delete(':categoryID')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('categoryID', ParseIntPipe) categoryID: number) {
    return this.categoriesService.delete(categoryID);
  }

  @Get()
  async getAll() {
    return this.categoriesService.getAll();
  }

  @Get('id/:categoryID')
  async getOneByID(@Param('categoryID', ParseIntPipe) categoryID: number) {
    return this.categoriesService.getOneByID(categoryID);
  }

  @Get('slug/:categorySlug')
  async getOneByName(@Param('categorySlug') categorySlug: string) {
    return this.categoriesService.getOneBySlug(categorySlug);
  }
}
