import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { AlbumRepositoryService } from './album.repository.service';
import { TrackRepositoryService } from '../track/track.repository.service';
import { FavoriteRepositoryService } from '../favorite/favorite.repository.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './album.entity';
import { ArtistRepositoryService } from '../artist/artist.repository.service';
import { ArtistEntity } from '../artist/artist.entity';
import { TrackEntity } from '../track/track.entity';
import { FavoriteEntity } from '../favorite/favorite.entity';
import { ArtistService } from '../artist/artist.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AlbumEntity,
      ArtistEntity,
      TrackEntity,
      FavoriteEntity,
    ]),
  ],
  controllers: [AlbumController],
  providers: [
    AlbumService,
    AlbumRepositoryService,
    ArtistRepositoryService,
    ArtistService,
    TrackRepositoryService,
    FavoriteRepositoryService,
  ],
})
export class AlbumModule {}
