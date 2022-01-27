import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pwd: string) {
    const existUser = await this.userService.findByUsername(username);

    if (!existUser) {
      return null;
    }

    const isMatch = await bcrypt.compare(pwd, existUser.password);

    if (!isMatch) {
      return null;
    }

    const { password, ...result } = existUser;
    return result;
  }

  async login(user) {
    const payload = { username: user.username, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
