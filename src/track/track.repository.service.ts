import { Injectable } from '@nestjs/common';
import {
  AbstractRepositoryService
} from '../repositories/abstract.repository.service';
import { TrackEntity } from './track.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TrackRepositoryService extends AbstractRepositoryService<TrackEntity>{
  constructor(
    @InjectRepository(TrackEntity)
    repository: Repository<TrackEntity>
  ) {
    super(repository);
  }
}
