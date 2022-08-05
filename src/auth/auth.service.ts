import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/user.entity';
import { UserRepositoryService } from '../user/user.repository.service';
import { compare } from 'bcrypt';
import { AuthDto } from './dto/auth.dto';

export type JwtPayload = {
  readonly login: string;
  readonly userId: string;
};

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepositoryService: UserRepositoryService,
  ) {}

  async validateUser(dto: AuthDto): Promise<UserEntity> {
    const user = await this.userRepositoryService.findOneByLogin(dto.login);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isCorrectPassword = await compare(dto.password,  user.getPassword());
    if (!isCorrectPassword) {
      throw new UnauthorizedException('Wrong user password');
    }

    return user;
  }

  async login(user: UserEntity) {
    const payload = <JwtPayload>{ login: user.login, userId: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
