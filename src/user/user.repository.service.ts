import { Injectable } from '@nestjs/common';
import { User } from './user';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepositoryService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getOneById(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  async save(entity: User): Promise<User> {
    return this.userRepository.save(entity);
  }

  async delete(entity: User): Promise<User> {
    return this.userRepository.remove(entity);
  }
}