import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';
import { UserRepositoryService } from '../user/user.repository.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
    ]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  providers: [AuthService, UserRepositoryService, UserService, ConfigService, JwtAccessStrategy, JwtRefreshStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
