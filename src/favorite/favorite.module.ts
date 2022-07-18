import { Module } from '@nestjs/common';
import { FavoriteController } from './favorite.controller';
import { FavoriteService } from './favorite.service';
import { FavoriteRepositoryService } from './favorite.repository.service';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { ArtistRepositoryService } from '../artist/artist.repository.service';
import { AlbumRepositoryService } from '../album/album.repository.service';
import { TrackRepositoryService } from '../track/track.repository.service';

@Module({
  controllers: [FavoriteController],
  providers: [
    FavoriteService,
    FavoriteRepositoryService,
    ArtistService,
    AlbumService,
    TrackService,
    ArtistRepositoryService,
    AlbumRepositoryService,
    TrackRepositoryService,
  ],
})
export class FavoriteModule {}
