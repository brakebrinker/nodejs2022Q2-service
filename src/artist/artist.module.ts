import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { ArtistRepositoryService } from './artist.repository.service';
import { AlbumRepositoryService } from '../album/album.repository.service';
import { TrackRepositoryService } from '../track/track.repository.service';
import { FavoriteRepositoryService } from '../favorite/favorite.repository.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './artist.entity';
import { AlbumEntity } from '../album/album.entity';
import { TrackEntity } from '../track/track.entity';
import { FavoriteEntity } from '../favorite/favorite.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ArtistEntity,
      AlbumEntity,
      TrackEntity,
      FavoriteEntity,
    ]),
  ],
  controllers: [ArtistController],
  providers: [
    ArtistService,
    ArtistRepositoryService,
    AlbumRepositoryService,
    TrackRepositoryService,
    FavoriteRepositoryService,
  ],
})
export class ArtistModule {}
