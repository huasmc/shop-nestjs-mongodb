import { Inject, Injectable } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { CreateOrderDto, Order, UpdateOrderDto } from './models/orders.model';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @InjectModel('order') private readonly orderModel: Model<Order>,
  ) {}

  async getOrders(skipOrders: number, limit?: number) {
    const count = await this.orderModel.countDocuments();
    const orders = this.orderModel.find(
      {},
      {},
      { skip: skipOrders, limit: limit },
    );
    return { ...orders, count };
  }

  async findUserOrders(user_id: string, skipOrders: number, limit: number) {
    const orders = await this.orderModel.find(
      { user_id },
      {},
      { skip: skipOrders, limit: limit },
    );
    const count = await this.orderModel.countDocuments();
    return { orders: orders, count };
  }

  async saveOrder(createOrderDto: CreateOrderDto) {
    const newOrder = new this.orderModel(createOrderDto);
    const user = await this.usersService.getUserById(
      new Types.ObjectId(createOrderDto.user_id),
    );
    if (!user) return { message: 'User doesnt exist', sucess: false };
    else if (user) {
      await newOrder.save();
      return newOrder;
    }
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
    const deletedOrder = await this.orderModel.findOneAndDelete({ _id }).exec();
    return { order: deletedOrder, success: deletedOrder !== null };
  }

  async deleteUserOrders(_id: string) {
    const deletedUserOrders = await this.orderModel.deleteMany({
      user_id: _id,
    });
    const deletedCount = deletedUserOrders.deletedCount;
    return {
      orders: deletedUserOrders,
      deletedUserOrders: deletedUserOrders.deletedCount,
      sucess: deletedCount > 0,
    };
  }
}
