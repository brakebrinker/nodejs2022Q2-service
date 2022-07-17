import { AlbumEntity } from './album.entity';

type CreateArgs = {
  readonly id: string;
  readonly name: string;
  readonly year: number;
  readonly artistId: string;
};

export class AlbumModel {
  readonly id: string;

  readonly name: string;

  readonly year: number;

  readonly artistId: string;

  private constructor({
    id,
    name,
    year,
    artistId,
  }: CreateArgs) {
    this.id = id;
    this.name = name;
    this.year = year;
    this.artistId = artistId;
  }

  static createNewFromEntity(entity: AlbumEntity): AlbumModel {
    return new this({
      id: entity.id,
      name: entity.getName(),
      year: entity.getYear(),
      artistId: entity.getArtistId(),
    })
  }
}
