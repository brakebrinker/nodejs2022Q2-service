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

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity, ArtistEntity])],
  controllers: [AlbumController],
  providers: [
    AlbumService,
    AlbumRepositoryService,
    ArtistRepositoryService,
    // TrackRepositoryService,
    // FavoriteRepositoryService,
  ],
})
export class AlbumModule {}
