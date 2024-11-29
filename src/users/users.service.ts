import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { PrismaService } from 'src/common/services/prisma.service';
import { HashingService } from 'src/common/services/hashing.service';
import { userWithRoleSelect } from './prisma/users.select';

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
      select: userWithRoleSelect,
    });
  }

  async remove(userId: number) {
    return await this.prismaService.user.delete({
      where: { id: +userId },
      select: userWithRoleSelect,
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
      where: { id: +userId },
      data: updateUserDto,
      select: userWithRoleSelect,
    });
  }

  async getAll() {
    return await this.prismaService.user.findMany({
      select: userWithRoleSelect,
    });
  }

  async getOne(userId: number) {
    return await this.prismaService.user.findUniqueOrThrow({
      where: { id: +userId },
      select: userWithRoleSelect,
    });
  }
}
