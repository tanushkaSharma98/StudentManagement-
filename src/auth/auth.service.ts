import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.model';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signup(dto) {
    const hash = await bcrypt.hash(dto.password, 10); // hashing plain password

 const role = dto.role || 'admin';

    const user = await User.create({ ...dto, password: hash, role }); // save hashed password and default role
    return user;
  }

  async login(dto) {
    // email of user to find 
    const user = await User.findOne({ where: { email: dto.email } });

    
    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // comparying the plain password and hash
    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { user_id: user.user_id, role: user.role };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
