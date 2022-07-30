import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TrackRepositoryService } from './track.repository.service';
import { TrackEntity } from './track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { FavoriteTypeEnum } from '../favorite/favorite-type.enum';
import { FavoriteRepositoryService } from '../favorite/favorite.repository.service';
import { ArtistRepositoryService } from '../artist/artist.repository.service';
import { AlbumRepositoryService } from '../album/album.repository.service';

@Injectable()
export class TrackService {
  constructor(
    private readonly trackRepositoryService: TrackRepositoryService,
    private readonly artistRepositoryService: ArtistRepositoryService,
    private readonly albumRepositoryService: AlbumRepositoryService,
    // private readonly favoriteRepositoryService: FavoriteRepositoryService,
  ) {}

  async findMany(): Promise<TrackEntity[]> {
    return this.trackRepositoryService.findAll();
  }

  async getOneOrFail(id: string): Promise<TrackEntity> {
    const track = await this.trackRepositoryService.getOneById({ id });

    if (track === null) {
      throw new HttpException('Track does not exist', HttpStatus.NOT_FOUND);
    }

    return track;
  }

  // async getOne(id: string): Promise<TrackEntity | undefined> {
  //   return this.trackRepositoryService.getOne(id);
  // }

  async create(dto: CreateTrackDto): Promise<TrackEntity> {
    const artist = await this.artistRepositoryService.getOneById({ id: dto.artistId});
    const album = await this.albumRepositoryService.getOneById({ id: dto.albumId});

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
      const artist = await this.artistRepositoryService.getOneById({ id: dto.artistId});

      track.setArtist(artist);
    }

    if (dto.albumId !== undefined) {
      const album = await this.albumRepositoryService.getOneById({ id: dto.albumId});

      track.setAlbum(album);
    }

    return this.trackRepositoryService.save(track);
  }

  async delete(id: string): Promise<TrackEntity> {
    const track = await this.getOneOrFail(id);

    await this.trackRepositoryService.delete(track);
    //
    // const relatedFavorite =
    //   await this.favoriteRepositoryService.getOneByUnitIdAndType(
    //     track.id,
    //     FavoriteTypeEnum.TRACKS,
    //   );
    //
    // if (relatedFavorite !== undefined) {
    //   await this.favoriteRepositoryService.delete(relatedFavorite.id);
    // }

    return track;
  }
}
