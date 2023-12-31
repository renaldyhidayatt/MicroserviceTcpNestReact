import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from '@myexperiment/domain';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard, RoleGuard } from '@myexperiment/auth-guard';

@ApiTags('Order')
@ApiBearerAuth()
@UseGuards(JwtGuard, RoleGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('/findUser/:id')
  async findByuserId(@Param('id') id: number): Promise<any> {
    return this.orderService.findByIdUser(id);
  }

  @Post('/create')
  async createOrder(@Body() dto: CreateOrderDto): Promise<any> {
    return await this.orderService.createOrder(dto);
  }

  @Get()
  async findAll(): Promise<any> {
    return await this.orderService.findAll();
  }

  @Delete('/delete/:id')
  async deleteOrder(@Param('id') id: string) {
    return await this.orderService.deleteOrder(id);
  }
}
