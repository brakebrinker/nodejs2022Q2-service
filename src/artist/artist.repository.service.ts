import { Injectable } from '@nestjs/common';
import { artists } from '../data';
import { ArtistEntity } from './artist.entity';

@Injectable()
export class ArtistRepositoryService {
  async getMany(): Promise<ArtistEntity[]> {
    return artists;
  }

  async getOne(id: string): Promise<ArtistEntity | undefined> {
    return artists.find((artist: ArtistEntity): boolean => artist.id === id);
  }

  async save(entity: ArtistEntity): Promise<ArtistEntity> {
    const existedEntity = await this.getOne(entity.id);

    if (existedEntity === undefined) {
      artists.push(entity);

      return entity;
    }

    for (const artistKey in entity) {
      existedEntity[artistKey] = entity[artistKey];
    }

    return existedEntity;
  }

  async delete(id: string): Promise<void> {
    const userIndex = artists.findIndex((artist) => artist.id === id);

    artists.splice(userIndex, 1);
  }
}
