import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';

@Injectable()
export abstract class AbstractRepositoryService<Entity extends ObjectLiteral> {
  protected constructor(
    protected readonly repository: Repository<Entity>,
  ) {}

  async findAll(): Promise<Entity[]> {
    return this.repository.find();
  }

  async getOneById(where: FindOptionsWhere<Entity>): Promise<Entity | null> {
    return this.repository.findOneBy(where);
  }

  async save(entity: DeepPartial<Entity>): Promise<Entity> {
    return this.repository.save(entity);
  }

  async delete(entity: Entity): Promise<Entity> {
    return this.repository.remove(entity);
  }
}