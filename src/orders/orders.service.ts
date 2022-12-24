import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateOrderDto, Order } from './models/orders.model';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('order') private readonly orderModel: Model<Order>,
  ) {}

  async getOrders() {
    return this.orderModel.find();
  }

  async findUserOrders(user_id: string) {
    const orders = await this.orderModel.find({
      user: new Types.ObjectId(user_id),
    });
    return orders;
  }

  async saveOrder(createOrderDto: CreateOrderDto) {
    const newOrder = new this.orderModel(createOrderDto);
    await newOrder.save();
    return newOrder;
  }
  async deleteOrder(_id: string) {
    const removedOrder = this.orderModel.findOneAndRemove({ _id });
    return removedOrder;
  }
}
