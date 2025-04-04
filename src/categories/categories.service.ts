import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CategoryDTO, UpdateCategoryDTO } from './dtos/category.dto';
import slug from 'slug';
import { defaultCategorySelector } from './selectors';

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCategoryDto: CategoryDTO) {
    const categorySlug = slug(createCategoryDto.name, '-');

    return this.prismaService.category.create({
      data: { ...createCategoryDto, slug: categorySlug },
      select: defaultCategorySelector
    });
  }

  async update(categoryID: number, updateCategoryDto: UpdateCategoryDTO) {
    let categorySlug: string | undefined;

    if (updateCategoryDto?.name) {
      categorySlug = slug(updateCategoryDto.name, '-');
    }

    return this.prismaService.category.update({
      where: { id: categoryID },
      data: { ...updateCategoryDto, slug: categorySlug },
      select: defaultCategorySelector
    });
  }

  async delete(categoryID: number) {
    return this.prismaService.category.delete({ where: { id: categoryID }, select: defaultCategorySelector });
  }

  async getAll() {
    return this.prismaService.category.findMany({ select: defaultCategorySelector });
  }

  async getOneByID(categoryID: number) {
    return this.prismaService.category.findUnique({
      where: { id: categoryID },
      select: defaultCategorySelector
    });
  }

  async getOneBySlug(categorySlug: string) {
    return this.prismaService.category.findUnique({
      where: { slug: categorySlug },
      select: defaultCategorySelector
    });
  }
}
