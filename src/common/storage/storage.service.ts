import { Inject, Injectable } from '@nestjs/common';
import { IStorageStrategy, IStorageStrategyToken } from './strategies/storage.strategy';

@Injectable()
export class StorageService {
  constructor(@Inject(IStorageStrategyToken) private readonly storageService: IStorageStrategy) {}

  async upload(file: Express.Multer.File) {
    return this.storageService.upload(file);
  }

  async delete(fileKey: string) {
    return this.storageService.delete(fileKey);
  }
}
