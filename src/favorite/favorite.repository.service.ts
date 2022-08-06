import { Injectable } from '@nestjs/common';
import { FavoriteTypeEnum } from './favorite-type.enum';
import { FavoriteEntity } from './favorite.entity';
import { AbstractRepositoryService } from '../repositories/abstract.repository.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

type GetOneByArtistAndTypeArgs = {
  readonly artistId: string;
  readonly type: FavoriteTypeEnum;
};

type GetOneByAlbumAndTypeArgs = {
  readonly albumId: string;
  readonly type: FavoriteTypeEnum;
};

type GetOneByTrackAndTypeArgs = {
  readonly trackId: string;
  readonly type: FavoriteTypeEnum;
};

@Injectable()
export class FavoriteRepositoryService extends AbstractRepositoryService<FavoriteEntity> {
  constructor(
    @InjectRepository(FavoriteEntity)
    repository: Repository<FavoriteEntity>,
  ) {
    super(repository);
  }

  async getOneByArtistAndType({
    artistId,
    type,
  }: GetOneByArtistAndTypeArgs): Promise<FavoriteEntity | null> {
    return this.repository
      .createQueryBuilder('favorite')
      .innerJoin('favorite.artists', 'artist', 'artist.id = :artistId')
      .andWhere('favorite.type = :type')
      .setParameters({
        artistId,
        type,
      })
      .getOne();
  }

  async getOneByAlbumAndType({
    albumId,
    type,
  }: GetOneByAlbumAndTypeArgs): Promise<FavoriteEntity | null> {
    return this.repository
      .createQueryBuilder('favorite')
      .innerJoin('favorite.albums', 'album', 'album.id = :albumId')
      .andWhere('favorite.type = :type')
      .setParameters({
        albumId,
        type,
      })
      .getOne();
  }

  async getOneByTrackAndType({
    trackId,
    type,
  }: GetOneByTrackAndTypeArgs): Promise<FavoriteEntity | null> {
    return this.repository
      .createQueryBuilder('favorite')
      .innerJoin('favorite.tracks', 'track', 'track.id = :trackId')
      .andWhere('favorite.type = :type')
      .setParameters({
        trackId,
        type,
      })
      .getOne();
  }
}
