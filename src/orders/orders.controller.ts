import {
  Controller,
  Body,
  Get,
  Put,
  UseGuards,
  Post,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/roles.enum';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import {
  CreateOrderDto,
  UpdateOrderDto,
  ReadOrdersDto,
  ReadUserOrdersDto,
} from './models/orders.model';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get('all')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getAllOrders(@Body() readOrdersDto: ReadOrdersDto) {
    const { skipOrders, limit } = readOrdersDto;
    return this.ordersService.getOrders(skipOrders, limit);
  }

  @Get('user')
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getUserOrders(@Body() readUserOrdersDto: ReadUserOrdersDto) {
    const { user_id, skipOrders, limit } = readUserOrdersDto;
    return this.ordersService.findUserOrders(user_id, skipOrders, limit);
  }

  @Post('add')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async addOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.saveOrder(createOrderDto);
  }

  @Delete('delete')
  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteOrder(@Body() body) {
    return this.ordersService.deleteOrder(body.order_id);
  }

  @Put('update')
  @Roles(Role.ADMIN, Role.USER)
  async updateOrder(@Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.updateOrder(updateOrderDto);
  }
}
