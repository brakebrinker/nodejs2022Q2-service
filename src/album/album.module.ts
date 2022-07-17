import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { AlbumRepositoryService } from './album.repository.service';
import { TrackRepositoryService } from '../track/track.repository.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, AlbumRepositoryService, TrackRepositoryService]
})
export class AlbumModule {}
