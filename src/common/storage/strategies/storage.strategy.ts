export const IStorageStrategyToken = Symbol('IStorageStrategy');

export interface IStorageStrategy {
  upload(file: Express.Multer.File): Promise<string>;
  delete(fileKey: string): Promise<void>;
}
