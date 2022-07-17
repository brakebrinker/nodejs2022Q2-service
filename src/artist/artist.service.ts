import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ArtistRepositoryService } from './artist.repository.service';
import { ArtistEntity } from './artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { AlbumRepositoryService } from '../album/album.repository.service';
import { albums } from '../data';
import { AlbumEntity } from '../album/album.entity';
import { TrackRepositoryService } from '../track/track.repository.service';
import { TrackEntity } from '../track/track.entity';

@Injectable()
export class ArtistService {
  constructor(
    private readonly artistRepositoryService: ArtistRepositoryService,
    private readonly albumRepositoryService: AlbumRepositoryService,
    private readonly trackRepositoryService: TrackRepositoryService,
  ) {}

  async findMany(): Promise<ArtistEntity[]> {
    return this.artistRepositoryService.getMany();
  }

  async getOneOrFail(id: string): Promise<ArtistEntity> {
    const artist = await this.artistRepositoryService.getOne(id);

    if (artist === undefined) {
      throw new HttpException('Artist does not exist', HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  async getOne(id: string): Promise<ArtistEntity | undefined> {
    return this.artistRepositoryService.getOne(id);
  }

  async create(dto: CreateArtistDto): Promise<ArtistEntity> {
    if (dto.name === undefined || dto.grammy === undefined) {
      throw new HttpException('Parameter is required', HttpStatus.BAD_REQUEST);
    }

    const artist = new ArtistEntity({
      name: dto.name,
      grammy: dto.grammy,
    });

    return this.artistRepositoryService.save(artist);
  }

  async update(id: string, dto: UpdateArtistDto): Promise<ArtistEntity> {
    const artist = await this.getOneOrFail(id);

    if (dto.name !== undefined) {
      artist.setName(dto.name);
    }

    if (dto.grammy !== undefined) {
      artist.setGrammy(dto.grammy);
    }

    return this.artistRepositoryService.save(artist);
  }

  async delete(id: string): Promise<ArtistEntity> {
    const artist = await this.getOneOrFail(id);

    await this.artistRepositoryService.delete(artist.id);

    const relatedAlbums = await this.albumRepositoryService.getManyByArtistId(artist.id);

    relatedAlbums.forEach((album: AlbumEntity): void => {
      album.setArtistId(null);
    })

    const relatedTracks = await this.trackRepositoryService.getManyByArtistId(artist.id);

    relatedTracks.forEach((track: TrackEntity): void => {
      track.setArtistId(null);
    })

    return artist;
  }
}
