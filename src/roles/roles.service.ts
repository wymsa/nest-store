import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { CreateRoleDto, UpdateRoleDto } from './dtos';
import { roleDefaultSelect } from './prisma/roles.select';

@Injectable()
export class RolesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    return await this.prismaService.role.create({
      data: createRoleDto,
      select: roleDefaultSelect,
    });
  }

  async remove(roleId: number) {
    return await this.prismaService.role.delete({
      where: { id: +roleId },
      select: roleDefaultSelect,
    });
  }

  async update(roleId: number, updateRoleDto: UpdateRoleDto) {
    return await this.prismaService.role.update({
      where: { id: +roleId },
      data: updateRoleDto,
      select: roleDefaultSelect,
    });
  }

  async getAll() {
    return await this.prismaService.role.findMany({
      select: roleDefaultSelect,
    });
  }

  async getOne(roleId: number) {
    return await this.prismaService.role.findUniqueOrThrow({
      where: { id: +roleId },
      select: roleDefaultSelect,
    });
  }
}
