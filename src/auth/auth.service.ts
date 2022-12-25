import { Injectable } from '@nestjs/common';
import { NotAcceptableException } from '@nestjs/common/exceptions';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUser(username);
    if (!user) throw new NotAcceptableException('User not found');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (user && isPasswordValid)
      return { userId: user._id, userName: user.username };
    else return null;
  }

  async signIn(user: any) {
    const payload = { username: user.userName, sub: user.userId };
    return this.jwtService.sign(payload);
  }
}
