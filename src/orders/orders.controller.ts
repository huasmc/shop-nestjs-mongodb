import { Controller, Body, Get, Put, UseGuards, Post } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/roles.enum';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { CreateOrderDto } from './models/orders.model';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get('all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  getAllOrders() {
    return this.ordersService.getOrders();
  }

  @Get('user')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER, Role.ADMIN)
  getUserOrders(@Body('user_id') user_id: string) {
    return this.ordersService.findUserOrders(user_id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Post('add')
  async addOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.saveOrder(createOrderDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Post('delete')
  async deleteOrder(@Body() body) {
    return this.ordersService.deleteOrder(body.order_id);
  }
}
