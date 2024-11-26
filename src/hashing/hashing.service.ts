import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {
  private readonly saltRounds = 10;

  async hash(data: string | Buffer) {
    return await bcrypt.hash(data, this.saltRounds);
  }

  async compare(data: string | Buffer, hashedData: string) {
    return await bcrypt.compare(data, hashedData);
  }
}
