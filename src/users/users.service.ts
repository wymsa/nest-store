import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create.dto';
import { UpdateUserDto } from './dtos/update.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async remove(userId: number) {
    const foundUser = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!foundUser) throw new NotFoundException('User not found');

    return await this.userRepository.remove(foundUser);
  }

  async update(userId: number, updateUserDto: UpdateUserDto) {
    const foundUser = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!foundUser) throw new NotFoundException('User not found');

    return await this.userRepository.save({ ...foundUser, ...updateUserDto });
  }

  async getAll() {
    return await this.userRepository.find();
  }

  async getOneById(userId: number) {
    const foundUser = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!foundUser) throw new NotFoundException('User not found');

    return foundUser;
  }

  async getOneByEmail(userEmail: string) {
    const foundUser = await this.userRepository.findOne({
      where: { email: userEmail },
    });

    if (!foundUser) throw new NotFoundException('User not found');

    return foundUser;
  }
}