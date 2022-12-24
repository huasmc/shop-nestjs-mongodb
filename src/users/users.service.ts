import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/auth/roles/roles.enum';
import { User } from './models/users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>) {}

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

  async addAdminRole(user_id: string) {
    const result: any = this.userModel.updateOne(
      { user_id },
      { $addToSet: { roles: Role.ADMIN } },
    );
    if (result && result.n > 0) return false;
    return true;
  }
}
