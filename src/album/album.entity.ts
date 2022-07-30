import { randomUUID } from 'crypto';
import {
  Column,
  Entity,
  ManyToOne,
  ObjectType,
  PrimaryColumn,
  RelationId,
} from 'typeorm';
import { ArtistEntity } from '../artist/artist.entity';

type CreateArgs = {
  readonly name: string;
  readonly year: number;
  readonly artist: ArtistEntity | null;
  readonly id?: string;
};

@Entity('album')
export class AlbumEntity {
  @PrimaryColumn('char', { length: 36 })
  readonly id: string;

  @Column()
  private name: string;

  @Column('int')
  private year: number;

  @ManyToOne((): ObjectType<ArtistEntity> => ArtistEntity, {
    nullable: true,
    lazy: true,
  })
  private artist: Promise<ArtistEntity> | ArtistEntity | null;

  @RelationId((album: AlbumEntity) => album.artist)
  readonly artistId: string | null;

  constructor(args: CreateArgs) {
    if (arguments.length === 0) {
      return;
    }

    const { name, year, artist } = args;

    this.name = name;
    this.year = year;
    this.artist = artist;

    this.id = randomUUID();
  }

  getYear(): number {
    return this.year;
  }

  setYear(year: number): void {
    this.year = year;
  }

  getArtist(): Promise<ArtistEntity> | ArtistEntity | null {
    return this.artist;
  }

  setArtist(artist: ArtistEntity | null): void {
    this.artist = artist;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }
}
