import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepositoryService } from '../user/user.repository.service';
import { compare } from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { AuthRefreshDto } from './dto/auth-refresh.dto';

export type JwtPayload = {
  readonly login: string;
  readonly userId: string;
};

export type TokensResult = {
  readonly accessToken: string;
  readonly refreshToken: string;
};

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private userRepositoryService: UserRepositoryService,
    private configService: ConfigService,
  ) {}

  async signIn(dto: AuthDto): Promise<TokensResult> {
    const user = await this.userRepositoryService.findOneByLogin(dto.login);

    if (user === null) {
      throw new ForbiddenException('User not found');
    }

    const isCorrectPassword = await compare(dto.password, user.getPassword());
    if (!isCorrectPassword) {
      throw new ForbiddenException('Wrong user password');
    }

    const tokens = await this.getTokens(user.id, user.login);

    await this.userService.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async signUp(dto: CreateUserDto): Promise<TokensResult> {
    const user = await this.userService.create(dto);

    const tokens = await this.getTokens(user.id, user.login);

    await this.userService.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async refresh(dto: AuthRefreshDto): Promise<TokensResult> {
    const decodedToken = await this.jwtService.verify(dto.refreshToken);

    const currentDateInSeconds = Math.round(new Date().getTime() / 1000);

    if (decodedToken.exp < currentDateInSeconds) {
      throw new ForbiddenException('Refresh token is expired');
    }

    const user = await this.userRepositoryService.findOneByRefreshToken(
      dto.refreshToken,
    );

    if (user === null) {
      throw new ForbiddenException('User not found');
    }

    const tokens = await this.getTokens(user.id, user.login);

    await this.userService.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  private async getTokens(
    userId: string,
    login: string,
  ): Promise<TokensResult> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.sign(
        {
          userId,
          login: login,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: this.configService.get<string>('TOKEN_EXPIRE_TIME'),
        },
      ),
      this.jwtService.sign(
        {
          userId,
          login: login,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get<string>(
            'TOKEN_REFRESH_EXPIRE_TIME',
          ),
        },
      ),
    ]);

    return <TokensResult>{
      accessToken,
      refreshToken,
    };
  }
}
