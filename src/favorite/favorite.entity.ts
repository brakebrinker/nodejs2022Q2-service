import { FavoriteTypeEnum } from './favorite-type.enum';
import { randomUUID } from 'crypto';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ObjectType,
  PrimaryColumn,
} from 'typeorm';
import { ArtistEntity } from '../artist/artist.entity';
import { AlbumEntity } from '../album/album.entity';
import { TrackEntity } from '../track/track.entity';

type CreateArgs = {
  readonly type: FavoriteTypeEnum;
  readonly artists: ArtistEntity[];
  readonly albums: AlbumEntity[];
  readonly tracks: TrackEntity[];
  readonly id?: string;
};

@Entity('favorite')
export class FavoriteEntity {
  @PrimaryColumn('char', { length: 36 })
  readonly id: string;

  @Column({ type: String, length: 10 })
  readonly type: FavoriteTypeEnum;

  @ManyToMany((): ObjectType<ArtistEntity> => ArtistEntity)
  @JoinTable()
  artists: ArtistEntity[];

  @ManyToMany((): ObjectType<AlbumEntity> => AlbumEntity)
  @JoinTable()
  albums: AlbumEntity[];

  @ManyToMany((): ObjectType<TrackEntity> => TrackEntity)
  @JoinTable()
  tracks: TrackEntity[];

  constructor(args: CreateArgs) {
    if (arguments.length === 0) {
      return;
    }

    const { type, artists, albums, tracks } = args;

    this.type = type;
    this.artists = artists;
    this.albums = albums;
    this.tracks = tracks;

    this.id = randomUUID();
  }
}
