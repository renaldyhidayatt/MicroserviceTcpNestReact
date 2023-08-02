import {
  ApiResponse,
  CreateRoleDto,
  Role,
  UpdateRoleDto,
} from '@myexperiment/domain';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post('/create')
  create(@Body() createRole: CreateRoleDto): Promise<any> {
    return this.roleService.createRole(createRole);
  }

  @Get()
  findAll(): Promise<any> {
    return this.roleService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<any> {
    return this.roleService.findById(id);
  }

  @Put(':id')
  updateById(@Param('id') id: number, @Body() updateRole: UpdateRoleDto) {
    return this.roleService.updateRole(id, updateRole);
  }

  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.roleService.deleteRole(id);
  }
}
