import {
  ClassSerializerInterceptor,
  Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post,
  UseInterceptors
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoritesResultModel } from './favorites-result.model';
import { ArtistModel } from '../artist/artist.model';
import { AlbumModel } from '../album/album.model';
import { TrackModel } from '../track/track.model';

@Controller('favs')
export class FavoriteController {
  constructor(
    private readonly favoriteService: FavoriteService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('')
  async getFavorites(): Promise<FavoritesResultModel> {
    const favorites = await this.favoriteService.findMany();

    return FavoritesResultModel.createNewFromFavoritesResult(favorites);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('artist/:id')
  async addArtist(@Param('id', new ParseUUIDPipe()) artistId: string): Promise<ArtistModel> {
    const artist = await this.favoriteService.addArtist(artistId);

    return ArtistModel.createNewFromEntity(artist);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('album/:id')
  async addAlbum(@Param('id', new ParseUUIDPipe()) albumId: string): Promise<AlbumModel> {
    const album = await this.favoriteService.addAlbum(albumId);

    return AlbumModel.createNewFromEntity(album);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('track/:id')
  async addTrack(@Param('id', new ParseUUIDPipe()) trackId: string): Promise<TrackModel> {
    const track = await this.favoriteService.addTrack(trackId);

    return TrackModel.createNewFromEntity(track);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('artist/:id')
  async deleteArtist(@Param('id', new ParseUUIDPipe()) artistId: string): Promise<void> {
    await this.favoriteService.deleteArtist(artistId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('album/:id')
  async deleteAlbum(@Param('id', new ParseUUIDPipe()) albumId: string): Promise<void> {
    await this.favoriteService.deleteAlbum(albumId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('track/:id')
  async deleteTrack(@Param('id', new ParseUUIDPipe()) trackId: string): Promise<void> {
    await this.favoriteService.deleteTrack(trackId);
  }
}
