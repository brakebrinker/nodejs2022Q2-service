import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepositoryService } from './user.repository.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepositoryService]
})
export class UserModule {}
