import { Injectable } from '@nestjs/common';
import { artists } from '../data';
import { ArtistEntity } from './artist.entity';

@Injectable()
export class ArtistRepositoryService {
  async getMany(): Promise<ArtistEntity[]> {
    return artists;
  }

  async getOne(id: string): Promise<ArtistEntity | undefined> {
    return artists.find((entity: ArtistEntity): boolean => entity.id === id);
  }

  async save(entity: ArtistEntity): Promise<ArtistEntity> {
    const existedEntity = await this.getOne(entity.id);

    if (existedEntity === undefined) {
      artists.push(entity);

      return entity;
    }

    for (const entityKey in entity) {
      existedEntity[entityKey] = entity[entityKey];
    }

    return existedEntity;
  }

  async delete(id: string): Promise<void> {
    const userIndex = artists.findIndex((entity) => entity.id === id);

    artists.splice(userIndex, 1);
  }
}
