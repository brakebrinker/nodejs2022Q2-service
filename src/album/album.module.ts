import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { AlbumRepositoryService } from './album.repository.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, AlbumRepositoryService]
})
export class AlbumModule {}
