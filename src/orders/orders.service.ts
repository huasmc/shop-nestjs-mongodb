import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateOrderDto, Order, UpdateOrderDto } from './models/orders.model';

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

  async updateOrder(updateOrderDto: UpdateOrderDto) {
    const updatedOrder = this.orderModel.findOneAndUpdate(
      { _id: updateOrderDto._id },
      { $set: { quantity: updateOrderDto.quantity } },
      { new: true },
    );
    return updatedOrder;
  }

  async deleteOrder(_id: string) {
    const deletedOrder = this.orderModel.findOneAndDelete({ _id });
    return deletedOrder;
  }

  async deleteUserOrders(_id: string) {
    const deletedUserOrders = this.orderModel.deleteMany({ user_id: _id });
    console.log(deletedUserOrders);
    return deletedUserOrders;
  }
}
