import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDTO, ProductFilterDTO, UpdateProductDTO } from './dtos/product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageService } from 'src/common/storage/storage.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly storageService: StorageService
  ) {}

  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async create(@Body() createProductDto: ProductDTO, @UploadedFile() image: Express.Multer.File) {
    const imageName = await this.storageService.upload(image);
    return await this.productsService.create(createProductDto, imageName);
  }

  @UseInterceptors(FileInterceptor('image'))
  @Patch(':productID')
  async update(
    @Param('productID', ParseIntPipe) productID: number,
    @Body() updateProductDto: UpdateProductDTO,
    @UploadedFile(new ParseFilePipe({ fileIsRequired: false })) image?: Express.Multer.File
  ) {
    let imageName: string | undefined;

    if (image) {
      imageName = await this.storageService.upload(image);
    }

    const { previousProductState, updatedProductState } = await this.productsService.update(
      productID,
      updateProductDto,
      imageName
    );

    if (previousProductState) {
      await this.storageService.delete(previousProductState.image);
    }

    return updatedProductState;
  }

  @Delete(':productID')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('productID', ParseIntPipe) productID: number) {
    const deletedProduct = await this.productsService.delete(productID);
    await this.storageService.delete(deletedProduct.image);

    return deletedProduct;
  }

  @Get('id/:productID')
  async getOneByID(@Param('productID', ParseIntPipe) productID: number) {
    return await this.productsService.getOneByID(productID);
  }

  @Get('slug/:productSlug')
  async getOneBySlug(@Param('productSlug') productSlug: string) {
    return await this.productsService.getOneBySlug(productSlug);
  }

  @Get()
  async getAll(@Query() productFilterDto: ProductFilterDTO) {
    return await this.productsService.getAll(
      productFilterDto.categoryIDs?.length ? productFilterDto.categoryIDs : undefined,
      productFilterDto.take,
      productFilterDto.skip
    );
  }
}
