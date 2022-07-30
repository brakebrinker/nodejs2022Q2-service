import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FavoriteRepositoryService } from './favorite.repository.service';
import { ArtistEntity } from '../artist/artist.entity';
import { AlbumEntity } from '../album/album.entity';
import { TrackEntity } from '../track/track.entity';
import { FavoriteTypeEnum } from './favorite-type.enum';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';

export type FavoritesResult = {
  readonly artists: ArtistEntity[];
  readonly albums: AlbumEntity[];
  readonly tracks: TrackEntity[];
};

@Injectable()
export class FavoriteService {
  constructor(
    private readonly favoriteRepositoryService: FavoriteRepositoryService,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}
  // async findMany(): Promise<FavoritesResult> {
  //   const favoriteArtists = await this.favoriteRepositoryService.getManyByType(
  //     FavoriteTypeEnum.ARTISTS,
  //   );
  //   const favoriteAlbums = await this.favoriteRepositoryService.getManyByType(
  //     FavoriteTypeEnum.ALBUMS,
  //   );
  //   const favoriteTracks = await this.favoriteRepositoryService.getManyByType(
  //     FavoriteTypeEnum.TRACKS,
  //   );
  //
  //   const artists = await Promise.all(
  //     favoriteArtists.map(async (favoriteArtist): Promise<ArtistEntity> => {
  //       return this.artistService.getOneOrFail(favoriteArtist.unitId);
  //     }),
  //   );
  //
  //   const albums = await Promise.all(
  //     favoriteAlbums.map(async (favoriteAlbum): Promise<AlbumEntity> => {
  //       return this.albumService.getOneOrFail(favoriteAlbum.unitId);
  //     }),
  //   );
  //
  //   const tracks = await Promise.all(
  //     favoriteTracks.map(async (favoriteTrack): Promise<TrackEntity> => {
  //       return this.trackService.getOneOrFail(favoriteTrack.unitId);
  //     }),
  //   );
  //
  //   return <FavoritesResult>{
  //     artists,
  //     albums,
  //     tracks,
  //   };
  // }
  //
  // async addArtist(id: string): Promise<ArtistEntity> {
  //   const artist = await this.artistService.getOne(id);
  //
  //   if (artist === undefined) {
  //     throw new HttpException(
  //       `Artist with id=${id} does not exist`,
  //       HttpStatus.UNPROCESSABLE_ENTITY,
  //     );
  //   }
  //
  //   await this.favoriteRepositoryService.save(id, FavoriteTypeEnum.ARTISTS);
  //
  //   return artist;
  // }
  //
  // async addAlbum(id: string): Promise<AlbumEntity> {
  //   const album = await this.albumService.getOneOrFail(id);
  //
  //   if (album === null) {
  //     throw new HttpException(
  //       `Album with id=${id} does not exist`,
  //       HttpStatus.UNPROCESSABLE_ENTITY,
  //     );
  //   }
  //
  //   await this.favoriteRepositoryService.save(id, FavoriteTypeEnum.ALBUMS);
  //
  //   return album;
  // }
  //
  // async addTrack(id: string): Promise<TrackEntity> {
  //   const track = await this.trackService.getOne(id);
  //
  //   if (track === undefined) {
  //     throw new HttpException(
  //       `Track with id=${id} does not exist`,
  //       HttpStatus.UNPROCESSABLE_ENTITY,
  //     );
  //   }
  //
  //   await this.favoriteRepositoryService.save(id, FavoriteTypeEnum.TRACKS);
  //
  //   return track;
  // }
  //
  // async deleteArtist(id: string): Promise<void> {
  //   const favoriteArtist =
  //     await this.favoriteRepositoryService.getOneByUnitIdAndType(
  //       id,
  //       FavoriteTypeEnum.ARTISTS,
  //     );
  //
  //   if (favoriteArtist === undefined) {
  //     throw new HttpException(
  //       `Artist with id=${id} does not in favorites`,
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }
  //
  //   await this.favoriteRepositoryService.delete(favoriteArtist.id);
  // }
  //
  // async deleteAlbum(id: string): Promise<void> {
  //   const favoriteAlbum =
  //     await this.favoriteRepositoryService.getOneByUnitIdAndType(
  //       id,
  //       FavoriteTypeEnum.ALBUMS,
  //     );
  //
  //   if (favoriteAlbum === undefined) {
  //     throw new HttpException(
  //       `Album with id=${id} does not in favorites`,
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }
  //
  //   await this.favoriteRepositoryService.delete(favoriteAlbum.id);
  // }
  //
  // async deleteTrack(id: string): Promise<void> {
  //   const favoriteTrack =
  //     await this.favoriteRepositoryService.getOneByUnitIdAndType(
  //       id,
  //       FavoriteTypeEnum.TRACKS,
  //     );
  //
  //   if (favoriteTrack === undefined) {
  //     throw new HttpException(
  //       `Track with id=${id} does not in favorites`,
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }
  //
  //   await this.favoriteRepositoryService.delete(favoriteTrack.id);
  // }
}
