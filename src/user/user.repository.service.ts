import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractRepositoryService } from '../repositories/abstract.repository.service';

@Injectable()
export class UserRepositoryService extends AbstractRepositoryService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity)
    repository: Repository<UserEntity>,
  ) {
    super(repository);
  }

  async findOneByLogin(login: string): Promise<UserEntity | null> {
    return this.repository
      .createQueryBuilder('user')
      .andWhere('user.login = :login', { login })
      .limit(1)
      .getOne();
  }

  async findOneByRefreshToken(refreshToken: string): Promise<UserEntity | null> {
    return this.repository
      .createQueryBuilder('user')
      .andWhere('user.refreshToken = :refreshToken', { refreshToken })
      .getOne();
  }
}
