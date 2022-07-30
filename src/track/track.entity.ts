import { randomUUID } from 'crypto';
// import { Column, Entity, ManyToOne, ObjectType, PrimaryColumn } from 'typeorm';
// import { ArtistEntity } from '../artist/artist.entity';

type CreateArgs = {
  readonly name: string;
  readonly duration: number;
  readonly artistId: string | null;
  readonly albumId: string | null;
  readonly id?: string;
};

// @Entity('track')
export class TrackEntity {
  // @PrimaryColumn('char', { length: 36})
  readonly id: string;

  // @Column()
  private name: string;

  // @Column('int')
  private duration: number;

  // @ManyToOne((): ObjectType<ArtistEntity> => ArtistEntity, {
  //   nullable: true,
  // })
  // private artist:  Promise<ArtistEntity> | ArtistEntity | null;
  private artistId: string | null;

  private albumId: string | null;

  constructor(args: CreateArgs) {
    const { name, duration, artistId, albumId } = args;

    this.name = name;
    this.duration = duration;
    this.artistId = artistId;
    this.albumId = albumId;

    this.id = randomUUID();
  }

  getDuration(): number {
    return this.duration;
  }

  setDuration(duration: number): void {
    this.duration = duration;
  }

  getArtistId(): string | null {
    return this.artistId;
  }

  setArtistId(artistId: string | null): void {
    this.artistId = artistId;
  }

  getAlbumId(): string | null {
    return this.albumId;
  }

  setAlbumId(albumId: string | null): void {
    this.albumId = albumId;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }
}
