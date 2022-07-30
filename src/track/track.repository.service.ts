import { Injectable } from '@nestjs/common';
// import { tracks } from '../data';
// import { TrackEntity } from './track.entity';

@Injectable()
export class TrackRepositoryService {
  // async getMany(): Promise<TrackEntity[]> {
  //   return tracks;
  // }
  //
  // async getManyByArtistId(artistId: string): Promise<TrackEntity[]> {
  //   return tracks.filter(
  //     (track: TrackEntity): boolean => track.getArtistId() === artistId,
  //   );
  // }
  //
  // async getManyByAlbumId(albumId: string): Promise<TrackEntity[]> {
  //   return tracks.filter(
  //     (track: TrackEntity): boolean => track.getAlbumId() === albumId,
  //   );
  // }
  //
  // async getOne(id: string): Promise<TrackEntity | undefined> {
  //   return tracks.find((entity: TrackEntity): boolean => entity.id === id);
  // }
  //
  // async save(entity: TrackEntity): Promise<TrackEntity> {
  //   const existedEntity = await this.getOne(entity.id);
  //
  //   if (existedEntity === undefined) {
  //     tracks.push(entity);
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
  //   const userIndex = tracks.findIndex((entity) => entity.id === id);
  //
  //   tracks.splice(userIndex, 1);
  // }
}
