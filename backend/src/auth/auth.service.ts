import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { LoginInput } from './dto/login.input';
import { LoginResponse } from './dto/login.response';
import { UserService } from 'src/users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginInput: LoginInput): Promise<LoginResponse> {
    const { username, password } = loginInput;
    const user = await this.userService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, username: user.username };
    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user_id: user.id,
      username: user.username,
    };
  }
}
