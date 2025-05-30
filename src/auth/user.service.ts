import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({ where: { email: createUserDto.email } });
    if (existingUser) {
      throw new BadRequestException('Email already in use');
    }

    const role = createUserDto.role ?? 'admin';

    const user = await this.userModel.create({
      ...createUserDto,
      role,
    });

    return user;
  }

  async loginUser(loginDto: LoginUserDto): Promise<User> {
    const user = await this.userModel.findOne({ where: { email: loginDto.email } });
    console.log("USER FOUND:", user);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Direct compare (no hashing)
    if (loginDto.password !== user.password) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return user;
  }
}
