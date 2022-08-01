import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { users } from '../data';

@Injectable()
export class UserRepositoryService {
  async getMany(): Promise<UserEntity[]> {
    return users;
  }

  async getOne(id: string): Promise<UserEntity | undefined> {
    return users.find((user: UserEntity): boolean => user.id === id);
  }

  async save(user: UserEntity): Promise<UserEntity> {
    users.push(user);

    return user;
  }

  async delete(id: string): Promise<void> {
    const userIndex = users.findIndex((user) => user.id === id);

    users.splice(userIndex, 1);
  }
}
