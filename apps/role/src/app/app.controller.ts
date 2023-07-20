import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { AppService } from './app.service';
import {
  ApiResponse,
  CreateRoleDto,
  UpdateRoleDto,
} from '@myexperiment/domain';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/create')
  create(@Body() createRole: CreateRoleDto): Promise<ApiResponse> {
    return this.appService.createRole(createRole);
  }

  @Get()
  findAll(): Promise<ApiResponse> {
    return this.appService.getAllRoles();
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<ApiResponse> {
    return this.appService.getRoleById(id);
  }

  @Put(':id')
  updateById(@Param('id') id: number, @Body() updateRole: UpdateRoleDto) {
    return this.appService.updateRoleById(id, updateRole);
  }

  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.appService.deleteRoleById(id);
  }
}
