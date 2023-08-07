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
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard, RoleGuard } from '@myexperiment/auth-guard';

@ApiTags('Role')
@ApiBearerAuth()
@UseGuards(JwtGuard, RoleGuard)
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
