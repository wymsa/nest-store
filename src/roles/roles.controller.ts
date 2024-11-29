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
import { RolesService } from './roles.service';
import { CreateRoleDto, UpdateRoleDto } from './dtos';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('/')
  async create(@Body() createRoleDto: CreateRoleDto) {
    return await this.rolesService.create(createRoleDto);
  }

  @Delete('/:id')
  async remove(@Param('id', ParseIntPipe) roleId: number) {
    return await this.rolesService.remove(roleId);
  }

  @Patch('/:id')
  async update(
    @Param('id', ParseIntPipe) roleId: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return await this.rolesService.update(roleId, updateRoleDto);
  }

  @Get('/')
  async getAll() {
    return await this.rolesService.getAll();
  }

  @Get('/:id')
  async getOne(@Param('id', ParseIntPipe) roleId: number) {
    return await this.rolesService.getOne(roleId);
  }
}
