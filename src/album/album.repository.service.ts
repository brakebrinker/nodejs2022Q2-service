import { Injectable } from '@nestjs/common';
import { AlbumEntity } from './album.entity';
import {
  AbstractRepositoryService
} from '../repositories/abstract.repository.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AlbumRepositoryService extends AbstractRepositoryService<AlbumEntity>{
  constructor(
    @InjectRepository(AlbumEntity)
    repository: Repository<AlbumEntity>,
  ) {
    super(repository);
  }
  // async getMany(): Promise<AlbumEntity[]> {
  //   return albums;
  // }

  // async getManyByArtistId(artistId: string): Promise<AlbumEntity[]> {
  //   return albums.filter(
  //     (album: AlbumEntity): boolean => album.getArtistId() === artistId,
  //   );
  // }
  //
  // async getOne(id: string): Promise<AlbumEntity | undefined> {
  //   return albums.find((entity: AlbumEntity): boolean => entity.id === id);
  // }
  //
  // async save(entity: AlbumEntity): Promise<AlbumEntity> {
  //   const existedEntity = await this.getOne(entity.id);
  //
  //   if (existedEntity === undefined) {
  //     albums.push(entity);
  //
  //     return entity;
  //   }
  //
  //   for (const entityKey in entity) {
  //     existedEntity[entityKey] = entity[entityKey];
  //   }
  //
  //   return existedEntity;
  // }
  //
  // async delete(id: string): Promise<void> {
  //   const userIndex = albums.findIndex((entity) => entity.id === id);
  //
  //   albums.splice(userIndex, 1);
  // }
}
