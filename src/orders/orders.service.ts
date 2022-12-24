import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateOrderDto, Order } from './models/orders.model';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('order') private readonly orderModel: Model<Order>,
  ) {}

  async findUserOrders(user_id: string) {
    const orders = await this.orderModel.find({
      user: new Types.ObjectId(user_id),
    });
    return orders;
  }

  async saveOrder({ product_id, user_id }: CreateOrderDto) {
    const newOrder = new this.orderModel({ product_id, user_id });
    await newOrder.save();
    return newOrder;
  }
}
