import { Injectable } from '@nestjs/common';
import { ArtistEntity } from './artist.entity';
import {
  AbstractRepositoryService
} from '../repositories/abstract.repository.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArtistRepositoryService extends AbstractRepositoryService<ArtistEntity> {
  constructor(
    @InjectRepository(ArtistEntity)
    repository: Repository<ArtistEntity>
  ) {
    super(repository);
  }
}
