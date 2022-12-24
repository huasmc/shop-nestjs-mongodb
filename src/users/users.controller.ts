import {
  Controller,
  Body,
  Post,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('/register')
  async addUser(
    @Body('username') userName: string,
    @Body('password') password: string,
  ) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const result = await this.userService.saveUser(userName, hashedPassword);
    return {
      message: 'User register sucess',
      userId: result.id,
      userName: result.username,
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('/sign-in')
  signIn(@Request() request): any {
    return { user: request.user, message: 'User sign-in success' };
  }
}
