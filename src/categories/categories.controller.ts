import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoriesService.create(createCategoryDto);
  }

  @Delete('/:categoryId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return await this.categoriesService.remove(categoryId);
  }

  @Patch('/:categoryId')
  @HttpCode(HttpStatus.OK)
  async update(@Param('categoryId', ParseIntPipe) categoryId: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return await this.categoriesService.update(categoryId, updateCategoryDto);
  }

  @Get('/:categoryId')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return await this.categoriesService.getOne(categoryId);
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return await this.categoriesService.getAll();
  }
}
