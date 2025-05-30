import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    return {
      id: user.user_id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }

  @Post('login')
  async login(@Body() loginDto: LoginUserDto) {
    const user = await this.userService.loginUser(loginDto);
    return {
      id: user.user_id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }
}
