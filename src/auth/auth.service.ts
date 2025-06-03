import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.model';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';


interface userDTO{
  password : string, 
  role: string
}

interface LogDto{
  email: string,
  password: string
}

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}



  async signup(dto : userDTO) {
    const hash = await bcrypt.hash(dto.password, 10);
    // hashing plain password

 const role = dto.role || 'admin';

    const user = await User.create({ ...dto, password: hash, role }); // save hashed password and default role
    return user;
  }

  async login(dto: LogDto) {
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
