import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { UpdateUserDTO, UserDTO } from './dtos/user.dto';

import { hash } from 'bcrypt';
import { defaultUserSelector, withPasswordUserSelector } from './selectors';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: UserDTO) {
    const hashedPassword = await hash(createUserDto.password, 12);

    return this.prismaService.user.create({
      data: { ...createUserDto, password: hashedPassword },
      select: defaultUserSelector
    });
  }

  async update(userID: number, updateUserDto: UpdateUserDTO) {
    let hashedPassword: string | undefined;

    if (updateUserDto.password) {
      hashedPassword = await hash(updateUserDto.password, 12);
    }

    return this.prismaService.user.update({
      data: { ...updateUserDto, password: hashedPassword },
      where: { id: userID },
      select: defaultUserSelector
    });
  }

  async delete(userID: number) {
    return this.prismaService.user.delete({ where: { id: userID }, select: defaultUserSelector });
  }

  async getAll(take?: number, skip?: number) {
    return this.prismaService.user.findMany({ take, skip, select: defaultUserSelector });
  }

  async getOneByID(userID: number) {
    return this.prismaService.user.findUnique({ where: { id: userID }, select: defaultUserSelector });
  }

  async getOneByEmail(userEmail: string) {
    return this.prismaService.user.findUnique({
      where: { email: userEmail },
      select: withPasswordUserSelector
    });
  }
}
