import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { StorageModule } from 'src/common/storage/storage.module';

@Module({
  imports: [PrismaModule, StorageModule],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
