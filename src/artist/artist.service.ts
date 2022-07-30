import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ArtistRepositoryService } from './artist.repository.service';
import { ArtistEntity } from './artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { AlbumEntity } from '../album/album.entity';
import { TrackRepositoryService } from '../track/track.repository.service';
import { TrackEntity } from '../track/track.entity';
import { FavoriteRepositoryService } from '../favorite/favorite.repository.service';
import { FavoriteTypeEnum } from '../favorite/favorite-type.enum';
import { AlbumRepositoryService } from '../album/album.repository.service';

@Injectable()
export class ArtistService {
  constructor(
    private readonly artistRepositoryService: ArtistRepositoryService,
    private readonly albumRepositoryService: AlbumRepositoryService,
    private readonly trackRepositoryService: TrackRepositoryService,
    private readonly favoriteRepositoryService: FavoriteRepositoryService,
  ) {}

  async findMany(): Promise<ArtistEntity[]> {
    return this.artistRepositoryService.findAll();
  }

  async getOneOrFail(id: string): Promise<ArtistEntity> {
    const artist = await this.artistRepositoryService.getOneById(id);

    if (artist === null) {
      throw new HttpException('Artist does not exist', HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  async getOne(id: string): Promise<ArtistEntity | null> {
    return this.artistRepositoryService.getOneById(id);
  }

  async create(dto: CreateArtistDto): Promise<ArtistEntity> {
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

    const relatedAlbums = await this.albumRepositoryService.getManyByArtist(
      artist.id,
    );

    relatedAlbums.forEach((album: AlbumEntity): void => {
      album.setArtist(null);
    });

    await this.albumRepositoryService.saveAll(relatedAlbums);

    const relatedTracks = await this.trackRepositoryService.getManyByArtist(
      artist.id,
    );

    relatedTracks.forEach((track: TrackEntity): void => {
      track.setArtist(null);
    });

    await this.trackRepositoryService.saveAll(relatedTracks);

    const relatedFavorite =
      await this.favoriteRepositoryService.getOneByArtistAndType({
        artistId: artist.id,
        type: FavoriteTypeEnum.ARTISTS,
      });

    if (relatedFavorite !== null) {
      await this.favoriteRepositoryService.delete(relatedFavorite);
    }

    return this.artistRepositoryService.delete(artist);
  }
}
