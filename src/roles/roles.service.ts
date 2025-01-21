import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { In, Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(RoleEntity) private readonly rolesRepository: Repository<RoleEntity>) {}

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
    return await this.findRoleById(roleId);
  }

  async getMany(roleIds: number[]) {
    const [foundRoles, foundRolesCount] = await this.rolesRepository.findAndCount({ where: { id: In(roleIds) } });
    const foundRoleIds = foundRoles.map((foundRole) => foundRole.id);
    const notFoundRoles = roleIds.filter((role) => !foundRoleIds.includes(role));

    if (roleIds.length !== foundRolesCount && notFoundRoles.length > 0) {
      throw new NotFoundException(`Role by IDs = ${notFoundRoles.join(', ')} not found`);
    }

    return await this.rolesRepository.findAndCount({ where: { id: In(roleIds) } });
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
