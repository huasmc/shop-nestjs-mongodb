import { Injectable } from '@nestjs/common';
import { NotAcceptableException } from '@nestjs/common/exceptions';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUser(username);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!user) throw new NotAcceptableException('User not found');
    if (user && isPasswordValid)
      return { userId: user.id, userName: user.username };
    else return null;
  }
}
