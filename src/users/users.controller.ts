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
import { CreateUserDTO, User, UserActionDTO } from './models/users.model';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async addUser(@Body() createUserDto: CreateUserDTO) {
    const { username, password } = createUserDto;
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const result = await this.userService.saveUser(username, hashedPassword);
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
  @Roles(Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getProfile(@Request() request): UserActionDTO {
    const { password, ...fields } = request.user;
    const { _doc } = fields;
    const { password: _, ...doc } = _doc;
    return doc;
  }

  @Get('all')
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  deleteUser(@Body() body) {
    return this.userService.deleteUser(body.user_id);
  }
}
