import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(CategoryEntity) private readonly categoriesRepository: Repository<CategoryEntity>) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const newCategory = this.categoriesRepository.create(createCategoryDto);
    return await this.categoriesRepository.save(newCategory);
  }

  async remove(categoryId: number) {
    const foundCategory = await this.findCategoryById(categoryId);
    return await this.categoriesRepository.remove(foundCategory);
  }

  async update(categoryId: number, updateCategoryDto: UpdateCategoryDto) {
    const foundCategory = await this.findCategoryById(categoryId);
    return await this.categoriesRepository.save({ ...foundCategory, ...updateCategoryDto });
  }

  async getOne(categoryId: number) {
    return await this.categoriesRepository.findOne({ where: { id: categoryId } });
  }

  async getAll() {
    return await this.categoriesRepository.findAndCount();
  }

  private async findCategoryById(categoryId: number) {
    const foundCategory = await this.categoriesRepository.findOne({ where: { id: categoryId } });
    if (!foundCategory) throw new NotFoundException(`Category by ID = ${categoryId} not found`);
    return foundCategory;
  }
}
