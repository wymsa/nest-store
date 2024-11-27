import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { HashingService } from 'src/hashing/hashing.service';
import { CreateUserDto, UpdateUserDto } from './dtos';

@Injectable()
export class UsersService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly hashingService: HashingService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await this.hashingService.hash(
      createUserDto.password,
    );

    return await this.databaseService.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
  }

  async remove(userId: number) {
    return await this.databaseService.user.delete({ where: { id: userId } });
  }

  async update(userId: number, updateUserDto: UpdateUserDto) {
    const isPasswordUpdating = Object.keys(updateUserDto).includes('password');

    if (isPasswordUpdating) {
      updateUserDto.password = await this.hashingService.hash(
        updateUserDto.password,
      );
    }

    return await this.databaseService.user.update({
      where: { id: userId },
      data: updateUserDto,
    });
  }

  async getAll() {
    return await this.databaseService.user.findMany();
  }

  async getOne(userId: number) {
    return await this.databaseService.user.findUniqueOrThrow({
      where: { id: userId },
    });
  }
}
