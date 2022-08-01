import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { TrackRepositoryService } from './track.repository.service';
import { FavoriteRepositoryService } from '../favorite/favorite.repository.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService, TrackRepositoryService, FavoriteRepositoryService],
})
export class TrackModule {}
