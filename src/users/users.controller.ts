import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/')
  async create(@Body() createUserDto: any) {
    return await this.usersService.create(createUserDto);
  }

  @Delete('/:id')
  async remove(@Param('id', ParseIntPipe) userId: number) {
    return await this.usersService.remove(userId);
  }

  @Patch('/:id')
  async update(
    @Param('id', ParseIntPipe) userId: number,
    @Body() updateUserDto: any,
  ) {
    return await this.usersService.update(userId, updateUserDto);
  }

  @Get('/')
  async getAll() {
    return await this.usersService.getAll();
  }

  @Get('/id/:id')
  async getOneById(@Param('id', ParseIntPipe) userId: number) {
    return await this.usersService.getOneById(userId);
  }

  @Get('/email/:email')
  async getOneByEmail(@Param('email') userEmail: string) {
    return await this.usersService.getOneByEmail(userEmail);
  }
}
