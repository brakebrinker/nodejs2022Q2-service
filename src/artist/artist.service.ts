import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ArtistRepositoryService } from './artist.repository.service';
import { ArtistEntity } from './artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(private readonly artistRepositoryService: ArtistRepositoryService) {}

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

    return artist;
  }
}
