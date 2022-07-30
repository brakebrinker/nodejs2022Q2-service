import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AlbumRepositoryService } from './album.repository.service';
import { AlbumEntity } from './album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { TrackEntity } from '../track/track.entity';
import { TrackRepositoryService } from '../track/track.repository.service';
import { FavoriteTypeEnum } from '../favorite/favorite-type.enum';
import { FavoriteRepositoryService } from '../favorite/favorite.repository.service';
import { ArtistService } from '../artist/artist.service';

@Injectable()
export class AlbumService {
  constructor(
    private readonly albumRepositoryService: AlbumRepositoryService,
    private readonly trackRepositoryService: TrackRepositoryService,
    private readonly favoriteRepositoryService: FavoriteRepositoryService,
    private readonly artistService: ArtistService,
  ) {}

  async findMany(): Promise<AlbumEntity[]> {
    return this.albumRepositoryService.findAll();
  }

  async getOneOrFail(id: string): Promise<AlbumEntity> {
    const album = await this.albumRepositoryService.getOneById(id);

    if (album === null) {
      throw new HttpException('Album does not exist', HttpStatus.NOT_FOUND);
    }

    return album;
  }

  async getOne(id: string): Promise<AlbumEntity | undefined> {
    return this.albumRepositoryService.getOneById(id);
  }

  async create(dto: CreateAlbumDto): Promise<AlbumEntity> {
    const artist = await this.artistService.getOne(dto.artistId);

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
      const artist = await this.artistService.getOne(dto.artistId);

      album.setArtist(artist);
    }

    return this.albumRepositoryService.save(album);
  }

  async delete(id: string): Promise<AlbumEntity> {
    const album = await this.getOneOrFail(id);

    const relatedTracks = await this.trackRepositoryService.getManyByAlbum(
      album.id,
    );

    relatedTracks.forEach((track: TrackEntity): void => {
      track.setAlbum(null);
    });

    await this.trackRepositoryService.saveAll(relatedTracks);

    const relatedFavorite =
      await this.favoriteRepositoryService.getOneByAlbumAndType({
        albumId: album.id,
        type: FavoriteTypeEnum.ALBUMS,
      });

    if (relatedFavorite !== null) {
      await this.favoriteRepositoryService.delete(relatedFavorite);
    }

    return this.albumRepositoryService.delete(album);
  }
}
