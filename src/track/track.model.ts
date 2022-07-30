import { TrackEntity } from './track.entity';

type CreateArgs = {
  readonly name: string;
  readonly duration: number;
  readonly artistId: string | null;
  readonly albumId: string | null;
  readonly id?: string;
};

export class TrackModel {
  readonly id: string;

  readonly name: string;

  readonly duration: number;

  readonly artistId: string | null;

  readonly albumId: string | null;

  private constructor({ id, name, duration, artistId, albumId }: CreateArgs) {
    this.id = id;
    this.name = name;
    this.duration = duration;
    this.artistId = artistId;
    this.albumId = albumId;
  }

  static createNewFromEntity(entity: TrackEntity): TrackModel {
    return new this({
      id: entity.id,
      name: entity.getName(),
      duration: entity.getDuration(),
      artistId: entity.artistId,
      albumId: entity.albumId,
    });
  }
}
