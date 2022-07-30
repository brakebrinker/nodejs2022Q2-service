import { AlbumEntity } from './album.entity';
import { ArtistModel } from '../artist/artist.model';

type CreateArgs = {
  readonly id: string;
  readonly name: string;
  readonly year: number;
};

export class AlbumModel {
  readonly id: string;

  readonly name: string;

  readonly year: number;

  readonly artist: ArtistModel | null;

  private constructor({ id, name, year }: CreateArgs) {
    this.id = id;
    this.name = name;
    this.year = year;
  }

  static createNewFromEntity(entity: AlbumEntity): AlbumModel {
    return new this({
      id: entity.id,
      name: entity.getName(),
      year: entity.getYear(),
    });
  }
}
