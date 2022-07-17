import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { ArtistRepositoryService } from './artist.repository.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, ArtistRepositoryService]
})
export class ArtistModule {}
