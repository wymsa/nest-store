import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDTO, UserDTO } from './dtos/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: UserDTO) {
    return await this.usersService.create(createUserDto);
  }

  @Patch(':userID')
  @HttpCode(HttpStatus.OK)
  async update(@Param('userID', ParseIntPipe) userID: number, @Body() updateUserDto: UpdateUserDTO) {
    return await this.usersService.update(userID, updateUserDto);
  }

  @Delete(':userID')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('userID', ParseIntPipe) userID: number) {
    return await this.usersService.delete(userID);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Query('take', new ParseIntPipe({ optional: true })) take?: number,
    @Query('skip', new ParseIntPipe({ optional: true })) skip?: number
  ) {
    return await this.usersService.getAll(take, skip);
  }

  @Get('id/:userID')
  @HttpCode(HttpStatus.OK)
  async getOneByID(@Param('userID', ParseIntPipe) userID: number) {
    return await this.usersService.getOneByID(userID);
  }

  @Get('email/:userEmail')
  @HttpCode(HttpStatus.OK)
  async getOneByEmail(@Param('userEmail') userEmail: string) {
    const foundUser = await this.usersService.getOneByEmail(userEmail);

    if (!foundUser) return null;

    const { password, ...restFoundUser } = foundUser;

    return restFoundUser;
  }
}
