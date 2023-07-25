import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { AppService } from './app.service';
import {
  ApiResponse,
  CreateRoleDto,
  UpdateRoleDto,
} from '@myexperiment/domain';
import { JwtGuard } from '@myexperiment/auth-guard';
import { RoleService } from '@myexperiment/infrastructure';

@Controller()
export class AppController {
  constructor(private readonly roleService: RoleService) {}

  @Post('/create')
  @UseGuards(JwtGuard)
  create(@Body() createRole: CreateRoleDto): Promise<ApiResponse> {
    return this.roleService.createRole(createRole);
  }

  @Get()
  @UseGuards(JwtGuard)
  findAll(): Promise<ApiResponse> {
    return this.roleService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<ApiResponse> {
    return this.roleService.findById(id);
  }

  @Put(':id')
  updateById(@Param('id') id: number, @Body() updateRole: UpdateRoleDto) {
    return this.roleService.updateById(id, updateRole);
  }

  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.roleService.deleteById(id);
  }
}
