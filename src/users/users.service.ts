import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashingService } from 'src/hashing/hashing.service';
import { CreateUserDto, UpdateUserDto } from './dtos';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashingService: HashingService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await this.hashingService.hash(
      createUserDto.password,
    );

    return await this.prismaService.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
      select: { id: true, email: true, password: false },
    });
  }

  async remove(userId: number) {
    return await this.prismaService.user.delete({
      where: { id: userId },
      select: { id: true, email: true, password: false },
    });
  }

  async update(userId: number, updateUserDto: UpdateUserDto) {
    const isPasswordUpdating = Object.keys(updateUserDto).includes('password');

    if (isPasswordUpdating) {
      updateUserDto.password = await this.hashingService.hash(
        updateUserDto.password,
      );
    }

    return await this.prismaService.user.update({
      where: { id: userId },
      data: updateUserDto,
      select: { id: true, email: true, password: false },
    });
  }

  async getAll() {
    return await this.prismaService.user.findMany({
      select: { id: true, email: true, password: false },
    });
  }

  async getOne(userId: number) {
    return await this.prismaService.user.findUniqueOrThrow({
      where: { id: userId },
      select: { id: true, email: true, password: false },
    });
  }
}
