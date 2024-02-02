import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signIn(user: any): Promise<any> {
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.sign(payload),
    };
  }

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    return await this.usersService.create(createUserDto);
  }
}
