import { ArtistEntity } from './artist.entity';

type CreateArgs = {
  readonly id: string;
  readonly name: string;
  readonly grammy: boolean;
};

export class ArtistModel {
  readonly id: string;

  readonly name: string;

  readonly grammy: boolean;

  private constructor({
    id,
    name,
    grammy,
  }: CreateArgs) {
    this.id = id;
    this.name = name;
    this.grammy = grammy;
  }

  static createNewFromEntity(entity: ArtistEntity): ArtistModel {
    return new this({
      id: entity.id,
      name: entity.getName(),
      grammy: entity.hasGrammy(),
    })
  }
}
