import { Injectable } from '@nestjs/common';
import { DeepPartial, FindManyOptions, Repository } from 'typeorm';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';
import { ObjectID } from 'typeorm/driver/mongodb/typings';

@Injectable()
export abstract class AbstractRepositoryService<Entity extends ObjectLiteral> {
  protected constructor(protected readonly repository: Repository<Entity>) {}

  async findAll(): Promise<Entity[]> {
    return this.repository.find();
  }

  async find(options: FindManyOptions<Entity>): Promise<Entity[]> {
    return this.repository.find(options);
  }

  async getOneById(
    id: number | string | Date | ObjectID,
  ): Promise<Entity | null> {
    return this.repository.findOneById(id);
  }

  async save(entity: DeepPartial<Entity>): Promise<Entity> {
    return this.repository.save(entity);
  }

  async saveAll(entities: Array<DeepPartial<Entity>>): Promise<Entity[]> {
    return this.repository.save(entities);
  }

  async deleteAll(entities: Array<Entity>): Promise<Entity[]> {
    return this.repository.remove(entities);
  }

  async delete(entity: Entity): Promise<Entity> {
    return this.repository.remove(entity);
  }
}
