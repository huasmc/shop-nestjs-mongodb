import {
  Controller,
  Body,
  Post,
  Get,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/auth/roles/roles.enum';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { UserActionDTO } from './models/users.model';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('register')
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

  @Put('add-admin-role')
  @UseGuards(JwtAuthGuard)
  async addAdminRole(@Body() body) {
    const { user_id } = body;
    const isSuccess = this.userService.addAdminRole(user_id);
    return isSuccess;
  }

  @Post('sign-in')
  @UseGuards(LocalAuthGuard)
  signIn(@Request() request): any {
    return this.authService.signIn(request.user);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER)
  getProfile(@Request() request): UserActionDTO {
    return request.user;
  }
}
