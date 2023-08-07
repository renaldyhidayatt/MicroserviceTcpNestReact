import { CartDto } from '@myexperiment/domain';
import { CartService } from './cart.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '@myexperiment/auth-guard';

@ApiBearerAuth()
@ApiTags('Cart')
@UseGuards(JwtGuard)
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @ApiOperation({ summary: 'find all cart' })
  @Get()
  async index(@Request() req): Promise<any> {
    return this.cartService.findAll(req.user.id);
  }

  @ApiOperation({ summary: 'create cart' })
  @Post()
  async create(@Body() cartDto: CartDto): Promise<any> {
    return this.cartService.create(cartDto);
  }

  @ApiOperation({ summary: 'delete cart' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    await this.cartService.deleteCart(id);
  }

  @Post('delete-many')
  async deleteMany(
    @Body('cartIds', ParseIntPipe) cartIds: number[]
  ): Promise<void> {
    if (!cartIds || cartIds.length === 0) {
      throw new Error('No cart IDs provided');
    }
    console.log(cartIds);

    try {
      await this.cartService.deleteMany(cartIds);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
