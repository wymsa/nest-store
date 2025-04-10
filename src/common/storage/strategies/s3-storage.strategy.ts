import { Injectable } from '@nestjs/common';
import { IStorageStrategy } from './storage.strategy';
import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { extname } from 'node:path';

@Injectable()
export class S3StorageStrategy implements IStorageStrategy {
  private readonly S3Client: S3Client;
  private readonly bucketName = 'nest-store-bucket';

  constructor(private readonly configService: ConfigService) {
    this.S3Client = new S3Client({
      region: configService.getOrThrow<string>('AWS_S3_REGION'),
      credentials: {
        accessKeyId: configService.getOrThrow<string>('AWS_S3_ACCESS_KEY'),
        secretAccessKey: configService.getOrThrow<string>('AWS_S3_SECRET_ACCESS_KEY')
      }
    });
  }

  async upload(file: Express.Multer.File): Promise<string> {
    const fileKey = `${Date.now()}${extname(file.originalname)}`;

    const putCommand = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype
    });

    await this.S3Client.send(putCommand);

    return fileKey;
  }

  async delete(fileKey: string): Promise<void> {
    const deleteCommand = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: fileKey
    });

    await this.S3Client.send(deleteCommand);
  }
}
