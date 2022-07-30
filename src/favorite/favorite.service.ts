import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FavoriteRepositoryService } from './favorite.repository.service';
import { ArtistEntity } from '../artist/artist.entity';
import { AlbumEntity } from '../album/album.entity';
import { TrackEntity } from '../track/track.entity';
import { FavoriteTypeEnum } from './favorite-type.enum';
import { ArtistRepositoryService } from '../artist/artist.repository.service';
import { FavoriteEntity } from './favorite.entity';
import { AlbumRepositoryService } from '../album/album.repository.service';
import { TrackRepositoryService } from '../track/track.repository.service';

export type FavoritesResult = {
  readonly artists: ArtistEntity[];
  readonly albums: AlbumEntity[];
  readonly tracks: TrackEntity[];
};

@Injectable()
export class FavoriteService {
  constructor(
    private readonly favoriteRepositoryService: FavoriteRepositoryService,
    private readonly artistRepositoryService: ArtistRepositoryService,
    private readonly albumRepositoryService: AlbumRepositoryService,
    private readonly trackRepositoryService: TrackRepositoryService,
  ) {}
  async findMany(): Promise<FavoritesResult> {
    const artists: ArtistEntity[] = [];
    const albums: AlbumEntity[] = [];
    const tracks: TrackEntity[] = [];

    const favorites = await this.favoriteRepositoryService.find({
      relations: {
        artists: true,
        albums: true,
        tracks: true,
      },
    });

    favorites.forEach((favoriteEntity: FavoriteEntity): void => {
      artists.push(...favoriteEntity.artists);
      albums.push(...favoriteEntity.albums);
      tracks.push(...favoriteEntity.tracks);
    });

    return <FavoritesResult>{
      artists,
      albums,
      tracks,
    };
  }

  async addArtist(id: string): Promise<ArtistEntity> {
    const artist = await this.artistRepositoryService.getOneById(id);

    if (artist === null) {
      throw new HttpException(
        `Artist with id=${id} does not exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const favorite = new FavoriteEntity({
      type: FavoriteTypeEnum.ARTISTS,
      artists: [artist],
      albums: [],
      tracks: [],
    });

    await this.favoriteRepositoryService.save(favorite);

    return artist;
  }

  async addAlbum(id: string): Promise<AlbumEntity> {
    const album = await this.albumRepositoryService.getOneById(id);

    if (album === null) {
      throw new HttpException(
        `Album with id=${id} does not exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const favorite = new FavoriteEntity({
      type: FavoriteTypeEnum.ALBUMS,
      artists: [],
      albums: [album],
      tracks: [],
    });

    await this.favoriteRepositoryService.save(favorite);

    return album;
  }

  async addTrack(id: string): Promise<TrackEntity> {
    const track = await this.trackRepositoryService.getOneById(id);

    if (track === null) {
      throw new HttpException(
        `Track with id=${id} does not exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const favorite = new FavoriteEntity({
      type: FavoriteTypeEnum.TRACKS,
      artists: [],
      albums: [],
      tracks: [track],
    });

    await this.favoriteRepositoryService.save(favorite);

    return track;
  }

  async deleteArtist(id: string): Promise<void> {
    const favoriteArtist =
      await this.favoriteRepositoryService.getOneByArtistAndType({
        artistId: id,
        type: FavoriteTypeEnum.ARTISTS,
      });

    if (favoriteArtist === null) {
      throw new HttpException(
        `Artist with id=${id} does not in favorites`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.favoriteRepositoryService.delete(favoriteArtist);
  }

  async deleteAlbum(id: string): Promise<void> {
    const favoriteAlbum =
      await this.favoriteRepositoryService.getOneByAlbumAndType({
        albumId: id,
        type: FavoriteTypeEnum.ALBUMS,
      });

    if (favoriteAlbum === null) {
      throw new HttpException(
        `Album with id=${id} does not in favorites`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.favoriteRepositoryService.delete(favoriteAlbum);
  }

  async deleteTrack(id: string): Promise<void> {
    const favoriteTrack =
      await this.favoriteRepositoryService.getOneByTrackAndType({
        trackId: id,
        type: FavoriteTypeEnum.TRACKS,
      });

    if (favoriteTrack === null) {
      throw new HttpException(
        `Track with id=${id} does not in favorites`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.favoriteRepositoryService.delete(favoriteTrack);
  }
}
