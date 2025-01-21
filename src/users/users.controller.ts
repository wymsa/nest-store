import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Delete('/:userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('userId', ParseIntPipe) userId: number) {
    return await this.usersService.remove(userId);
  }

  @Patch('/:userId')
  @HttpCode(HttpStatus.OK)
  async update(@Param('userId', ParseIntPipe) userId: number, @Body() updateUserDto) {
    return await this.usersService.update(userId, updateUserDto);
  }

  @Get('/:userId')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('userId', ParseIntPipe) roleId: number) {
    return await this.usersService.getOne(roleId);
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return await this.usersService.getAll();
  }
}
