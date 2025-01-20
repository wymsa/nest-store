import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.rolesService.create(createRoleDto);
  }

  @Delete('/:roleId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('roleId', ParseIntPipe) roleId: number) {
    return await this.rolesService.remove(roleId);
  }

  @Patch('/:roleId')
  @HttpCode(HttpStatus.OK)
  async update(@Param('roleId') roleId: number, @Body() updateRoleDto: UpdateRoleDto) {
    return await this.rolesService.update(roleId, updateRoleDto);
  }

  @Get('/:roleId')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('roleId', ParseIntPipe) roleId: number) {
    return await this.rolesService.getOne(roleId);
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return await this.rolesService.getAll();
  }
}
