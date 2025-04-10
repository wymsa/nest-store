import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ProductDTO, UpdateProductDTO } from './dtos/product.dto';
import slug from 'slug';
import { StorageService } from 'src/common/storage/storage.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createProductDto: ProductDTO, image: string) {
    const { categoryID, ...rest } = createProductDto;
    const productSlug = slug(createProductDto.title, '-');
    return this.prismaService.product.create({
      data: {
        ...rest,
        slug: productSlug,
        image: image,
        category: {
          connect: { id: categoryID }
        }
      }
    });
  }

  async update(productID: number, updateProductDto: UpdateProductDTO, image?: string) {
    const { categoryID, ...rest } = updateProductDto;
    let productSlug: string | undefined;

    if (updateProductDto.title) {
      productSlug = slug(updateProductDto.title, '-');
    }

    const [previousProductState, updatedProductState] = await this.prismaService.$transaction([
      this.prismaService.product.findUnique({ where: { id: productID } }),
      this.prismaService.product.update({
        where: { id: productID },
        data: {
          ...rest,
          slug: productSlug,
          image: image,
          category: categoryID ? { connect: { id: categoryID } } : undefined
        }
      })
    ]);

    return { previousProductState, updatedProductState };
  }

  async delete(productID: number) {
    return this.prismaService.product.delete({ where: { id: productID } });
  }

  async getOneByID(productID: number) {
    return this.prismaService.product.findUnique({ where: { id: productID } });
  }

  async getOneBySlug(productSlug: string) {
    return this.prismaService.product.findUnique({ where: { slug: productSlug } });
  }

  async getAll(categoryIDs?: number[], take?: number, skip?: number) {
    return this.prismaService.product.findMany({
      take,
      skip,
      where: {
        category: { id: { in: categoryIDs } }
      }
    });
  }
}
