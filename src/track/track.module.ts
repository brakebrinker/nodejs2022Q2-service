import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { TrackRepositoryService } from './track.repository.service';
import { FavoriteRepositoryService } from '../favorite/favorite.repository.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from './track.entity';
import { ArtistRepositoryService } from '../artist/artist.repository.service';
import { AlbumRepositoryService } from '../album/album.repository.service';
import { ArtistEntity } from '../artist/artist.entity';
import { AlbumEntity } from '../album/album.entity';
import { FavoriteEntity } from '../favorite/favorite.entity';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TrackEntity,
      ArtistEntity,
      AlbumEntity,
      FavoriteEntity,
    ]),
  ],
  controllers: [TrackController],
  providers: [
    TrackService,
    TrackRepositoryService,
    ArtistRepositoryService,
    ArtistService,
    AlbumRepositoryService,
    AlbumService,
    FavoriteRepositoryService,
  ],
})
export class TrackModule {}
