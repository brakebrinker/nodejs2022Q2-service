import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserRepositoryService } from './user.repository.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepositoryService: UserRepositoryService,
  ) {}

  async findMany(): Promise<User[]> {
    return this.userRepositoryService.findAll();
  }

  async getOneOrFail(id: string): Promise<User> {
    const user = await this.userRepositoryService.getOneById(id);

    if (user === null) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async create(dto: CreateUserDto): Promise<User> {
    if (dto.login === undefined || dto.password === undefined) {
      throw new HttpException('Parameter is required', HttpStatus.BAD_REQUEST);
    }

    const user = new User({
      login: dto.login,
      password: dto.password,
      version: 1,
    });

    return this.userRepositoryService.save(user);
  }

  async updatePassword(
    id: string,
    dto: UpdatePasswordDto,
  ): Promise<User> {
    if (dto.oldPassword === undefined || dto.newPassword === undefined) {
      throw new HttpException('Parameter is required', HttpStatus.BAD_REQUEST);
    }

    const user = await this.getOneOrFail(id);

    if (user.getPassword() !== dto.oldPassword) {
      throw new HttpException('Old password is wrong', HttpStatus.FORBIDDEN);
    }

    user.setPassword(dto.newPassword);
    user.setUpdatedAt(new Date().getTime());
    user.updateVersion();

    return this.userRepositoryService.save(user);
  }

  async delete(id: string): Promise<User> {
    const user = await this.getOneOrFail(id);

    return this.userRepositoryService.delete(user);
  }
}
