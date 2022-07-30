import { Injectable } from '@nestjs/common';
import { AbstractRepositoryService } from '../repositories/abstract.repository.service';
import { TrackEntity } from './track.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TrackRepositoryService extends AbstractRepositoryService<TrackEntity> {
  constructor(
    @InjectRepository(TrackEntity)
    repository: Repository<TrackEntity>,
  ) {
    super(repository);
  }

  async getManyByArtist(artistId: string): Promise<TrackEntity[]> {
    return this.repository
      .createQueryBuilder('track')
      .andWhere('track.artistId = :artistId', { artistId })
      .getMany();
  }

  async getManyByAlbum(albumId: string): Promise<TrackEntity[]> {
    return this.repository
      .createQueryBuilder('track')
      .andWhere('track.albumId = :albumId', { albumId })
      .getMany();
  }
}
