import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put, UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserModel } from './user.model';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('')
  async getUsers(): Promise<UserModel[]> {
    const users = await this.userService.findMany();

    return users.map((user: UserEntity): UserModel => {
      return UserModel.createNewFromEntity(user);
    });
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getUser(
    @Param('id', new ParseUUIDPipe()) userId: string,
  ): Promise<UserModel> {
    const user = await this.userService.getOneOrFail(userId);

    return UserModel.createNewFromEntity(user);
  }

  @UsePipes(new ValidationPipe())
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('')
  async create(@Body() dto: CreateUserDto): Promise<UserModel> {
    const user = await this.userService.create(dto);

    return UserModel.createNewFromEntity(user);
  }

  @UsePipes(new ValidationPipe())
  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  async updatePassword(
    @Param('id', new ParseUUIDPipe()) userId: string,
    @Body() dto: UpdatePasswordDto,
  ): Promise<UserModel> {
    const user = await this.userService.updatePassword(userId, dto);

    return UserModel.createNewFromEntity(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(
    @Param('id', new ParseUUIDPipe()) userId: string,
  ): Promise<void> {
    await this.userService.delete(userId);
  }
}
