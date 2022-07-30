import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AlbumRepositoryService } from './album.repository.service';
import { AlbumEntity } from './album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { ArtistRepositoryService } from '../artist/artist.repository.service';
import { UpdateAlbumDto } from './dto/update-album.dto';
// import { TrackEntity } from '../track/track.entity';
// import { TrackRepositoryService } from '../track/track.repository.service';
// import { FavoriteTypeEnum } from '../favorite/favorite-type.enum';
// import { FavoriteRepositoryService } from '../favorite/favorite.repository.service';

@Injectable()
export class AlbumService {
  constructor(
    private readonly albumRepositoryService: AlbumRepositoryService,
    // private readonly trackRepositoryService: TrackRepositoryService,
    // private readonly favoriteRepositoryService: FavoriteRepositoryService,
    private readonly artistRepositoryService: ArtistRepositoryService,
  ) {}

  async findMany(): Promise<AlbumEntity[]> {

    return this.albumRepositoryService.findAll();
  }

  async getOneOrFail(id: string): Promise<AlbumEntity> {
    const album = await this.albumRepositoryService.getOneById({ id });

    if (album === null) {
      throw new HttpException('Album does not exist', HttpStatus.NOT_FOUND);
    }

    return album;
  }

  // async getOne(id: string): Promise<AlbumEntity | undefined> {
  //   return this.albumRepositoryService.getOne(id);
  // }

  async create(dto: CreateAlbumDto): Promise<AlbumEntity> {
    const artist = await this.artistRepositoryService.getOneById({ id: dto.artistId });

    const album = new AlbumEntity({
      name: dto.name,
      year: dto.year,
      artist,
    });

    return this.albumRepositoryService.save(album);
  }

  async update(id: string, dto: UpdateAlbumDto): Promise<AlbumEntity> {
    const album = await this.getOneOrFail(id);

    if (dto.name !== undefined) {
      album.setName(dto.name);
    }

    if (dto.year !== undefined) {
      album.setYear(dto.year);
    }

    if (dto.artistId !== undefined) {
      const artist = await this.artistRepositoryService.getOneById({ id: dto.artistId });

      album.setArtist(artist);
    }

    return this.albumRepositoryService.save(album);
  }

  async delete(id: string): Promise<AlbumEntity> {
    const album = await this.getOneOrFail(id);

    await this.albumRepositoryService.delete(album);

    // const relatedTracks = await this.trackRepositoryService.getManyByAlbumId(
    //   album.id,
    // );
    //
    // relatedTracks.forEach((track: TrackEntity): void => {
    //   track.setAlbumId(null);
    // });
    //
    // const relatedFavorite =
    //   await this.favoriteRepositoryService.getOneByUnitIdAndType(
    //     album.id,
    //     FavoriteTypeEnum.ALBUMS,
    //   );
    //
    // if (relatedFavorite !== undefined) {
    //   await this.favoriteRepositoryService.delete(relatedFavorite.id);
    // }

    return album;
  }
}
