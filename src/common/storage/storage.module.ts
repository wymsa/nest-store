import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { S3StorageStrategy } from './strategies/s3-storage.strategy';
import { IStorageStrategyToken } from './strategies/storage.strategy';

@Module({
  providers: [
    {
      provide: IStorageStrategyToken,
      useClass: S3StorageStrategy
    },
    StorageService
  ],
  exports: [StorageService]
})
export class StorageModule {}
