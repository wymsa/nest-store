import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RolesService } from 'src/roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private readonly usersRepository: Repository<UserEntity>,
    private readonly rolesService: RolesService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { roles } = createUserDto;
    const [foundRoles] = await this.rolesService.getMany(roles);

    const newUser = this.usersRepository.create({ ...createUserDto, roles: foundRoles });
    return await this.usersRepository.save(newUser);
  }

  async remove(userId: number) {
    const foundUser = await this.findUserById(userId);
    return await this.usersRepository.remove(foundUser);
  }

  async update(userId: number, updateUserDto: UpdateUserDto) {
    const foundUser = await this.findUserById(userId);
    const { roles: roleIds, ...updateUserData } = updateUserDto;

    if (roleIds) {
      const [foundRoles] = await this.rolesService.getMany(roleIds);
      foundUser.roles = foundRoles;
    }

    return await this.usersRepository.save({ ...foundUser, ...updateUserData });
  }

  async getOne(userId: number) {
    return await this.findUserById(userId);
  }

  async getAll() {
    return await this.usersRepository.findAndCount({ relations: { roles: true }, select: { roles: { id: true, title: true } } });
  }

  private async findUserById(userId: number) {
    const foundUser = await this.usersRepository.findOne({ where: { id: userId } });
    if (!foundUser) throw new NotFoundException(`User by ID = ${userId} not found`);
    return await this.usersRepository.findOne({ where: { id: userId } });
  }
}
