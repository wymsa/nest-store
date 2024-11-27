import { Injectable } from '@nestjs/common';
import { HashingService } from 'src/hashing/hashing.service';

@Injectable()
export class UsersService {
  constructor(private readonly hashingService: HashingService) {}

  async create(createUserDto: any) {
    throw new Error('Method not implemented.');
  }

  async remove(userId: number) {
    throw new Error('Method not implemented.');
  }

  async update(userId: number, updateUserDto: any) {
    throw new Error('Method not implemented.');
  }

  async getAll() {
    throw new Error('Method not implemented.');
  }

  async getOneById(userId: number) {
    throw new Error('Method not implemented.');
  }

  async getOneByEmail(userEmail: string) {
    throw new Error('Method not implemented.');
  }
}
