import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Role } from 'src/auth/roles/roles.enum';
import { OrdersService } from 'src/orders/orders.service';
import { User } from './models/users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<User>,
    @Inject(OrdersService) private readonly ordersService: OrdersService,
  ) {}

  async getAllUsers() {
    const users = this.userModel.find().select({ password: 0 });
    return users;
  }

  async saveUser(userName: string, password: string) {
    const username = userName.toLowerCase();
    const newUser = new this.userModel({ username, password });
    await newUser.save();
    return newUser;
  }

  async getUser(userName: string) {
    const username = userName.toLowerCase();
    const user = this.userModel.findOne({ username });
    return user;
  }

  async getUserById(_id: Types.ObjectId) {
    const user = this.userModel.findOne({ _id });
    return user;
  }

  async addAdminRole(userId: string) {
    const result: any = await this.userModel.updateOne(
      { _id: new Types.ObjectId(userId) },
      { $addToSet: { roles: Role.ADMIN } },
    );
    if (result && result.modifiedCount > 0) return true;
    return false;
  }

  async deleteUser(_id: string) {
    const deletedUser = await this.userModel.findOneAndDelete({ _id });
    const deletedOrders = await this.ordersService.deleteUserOrders(_id);
    return {
      user: deletedUser,
      orders: deletedOrders.deletedCount,
      sucess: deletedUser !== null,
    };
  }
}
