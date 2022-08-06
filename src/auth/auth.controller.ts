import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { AuthService, TokensResult } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthRefreshDto } from './dto/auth-refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(@Body() dto: AuthDto): Promise<TokensResult> {
    return this.authService.signIn(dto);
  }

  @UsePipes(new ValidationPipe())
  @Post('signup')
  async signup (@Body() dto: CreateUserDto): Promise<TokensResult> {
    return  this.authService.signUp(dto);
  }

  @UsePipes(new ValidationPipe())
  @Post('refresh')
  async refresh (@Body() dto: AuthRefreshDto): Promise<TokensResult> {
    return this.authService.refresh(dto);
  }
}
