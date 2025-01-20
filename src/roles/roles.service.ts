import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private readonly rolesRepository: Repository<Role>) {}

  async create(createRoleDto: CreateRoleDto) {
    const newRole = this.rolesRepository.create(createRoleDto);
    return await this.rolesRepository.save(newRole);
  }

  async remove(roleId: number) {
    const foundRole = await this.findRoleById(roleId);
    return await this.rolesRepository.remove(foundRole);
  }

  async update(roleId: number, updateRoleDto: UpdateRoleDto) {
    const foundRole = await this.findRoleById(roleId);
    return await this.rolesRepository.save({ ...foundRole, ...updateRoleDto });
  }

  async getOne(roleId: number) {
    await this.findRoleById(roleId);
    return await this.rolesRepository.findOne({ where: { id: roleId } });
  }

  async getAll() {
    return await this.rolesRepository.findAndCount();
  }

  private async findRoleById(roleId: number) {
    const foundRole = await this.rolesRepository.findOne({ where: { id: roleId } });
    if (!foundRole) throw new NotFoundException(`Role by ID = ${roleId} not found`);
    return await this.rolesRepository.findOne({ where: { id: roleId } });
  }
}
