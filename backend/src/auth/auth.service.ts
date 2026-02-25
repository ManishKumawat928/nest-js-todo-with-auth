import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/user.schema';
import { JwtService } from '../common/guards/jwt-auth.guard';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async register(data) {
    const hashed = await bcrypt.hash(data.password, 10);

    const user = await this.userModel.create({
      ...data,
      password: hashed
    });

    return user;
  }

  async login(data) {
    const user = await this.userModel.findOne({ email: data.email });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = {
      sub: user._id,
      email: user.email,
      role: user.role
    };

    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
