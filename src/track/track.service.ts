import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TrackRepositoryService } from './track.repository.service';
import { TrackEntity } from './track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { FavoriteTypeEnum } from '../favorite/favorite-type.enum';
import { FavoriteRepositoryService } from '../favorite/favorite.repository.service';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';

@Injectable()
export class TrackService {
  constructor(
    private readonly trackRepositoryService: TrackRepositoryService,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly favoriteRepositoryService: FavoriteRepositoryService,
  ) {}

  async findMany(): Promise<TrackEntity[]> {
    return this.trackRepositoryService.findAll();
  }

  async getOneOrFail(id: string): Promise<TrackEntity> {
    const track = await this.trackRepositoryService.getOneById(id);

    if (track === null) {
      throw new HttpException('Track does not exist', HttpStatus.NOT_FOUND);
    }

    return track;
  }

  async create(dto: CreateTrackDto): Promise<TrackEntity> {
    const artist = await this.artistService.getOne(dto.artistId);
    const album = await this.albumService.getOne(dto.albumId);

    const track = new TrackEntity({
      name: dto.name,
      duration: dto.duration,
      artist,
      album,
    });

    return this.trackRepositoryService.save(track);
  }

  async update(id: string, dto: UpdateTrackDto): Promise<TrackEntity> {
    const track = await this.getOneOrFail(id);

    if (dto.name !== undefined) {
      track.setName(dto.name);
    }

    if (dto.duration !== undefined) {
      track.setDuration(dto.duration);
    }

    if (dto.artistId !== undefined) {
      const artist = await this.artistService.getOne(dto.artistId);

      track.setArtist(artist);
    }

    if (dto.albumId !== undefined) {
      const album = await this.albumService.getOne(dto.albumId);

      track.setAlbum(album);
    }

    return this.trackRepositoryService.save(track);
  }

  async delete(id: string): Promise<TrackEntity> {
    const track = await this.getOneOrFail(id);

    const relatedFavorite =
      await this.favoriteRepositoryService.getOneByTrackAndType({
        trackId: track.id,
        type: FavoriteTypeEnum.TRACKS,
      });

    if (relatedFavorite !== null) {
      await this.favoriteRepositoryService.delete(relatedFavorite);
    }

    return this.trackRepositoryService.delete(track);
  }
}
