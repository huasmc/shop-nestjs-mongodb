import { Controller, Body, Post, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/register')
  async addUser(
    @Body('username') userName: string,
    @Body('password') password: string,
  ) {
    console.log(userName);
    console.log(password);
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const result = await this.userService.saveUser(userName, hashedPassword);
    return {
      message: 'User register sucess',
      userId: result.id,
      userName: result.username,
    };
  }
}
