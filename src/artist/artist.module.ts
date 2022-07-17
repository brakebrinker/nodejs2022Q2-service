import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { ArtistRepositoryService } from './artist.repository.service';
import { AlbumRepositoryService } from '../album/album.repository.service';
import { TrackRepositoryService } from '../track/track.repository.service';

@Module({
  controllers: [ArtistController],
  providers: [
    ArtistService,
    ArtistRepositoryService,
    AlbumRepositoryService,
    TrackRepositoryService,
  ]
})
export class ArtistModule {}
