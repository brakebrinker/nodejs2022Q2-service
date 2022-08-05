import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards, UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body() dto: AuthDto) {
    const user = await this.authService.validateUser(dto);

    return this.authService.login(user);
  }

  @UsePipes(new ValidationPipe())
  @Post('signup')
  async signup (@Body() dto: CreateUserDto) {
    await this.userService.create(dto);
  }
}
