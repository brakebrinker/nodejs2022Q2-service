import { randomUUID } from 'crypto';
import { Column, Entity, ManyToOne, ObjectType, PrimaryColumn } from 'typeorm';
import { ArtistEntity } from '../artist/artist.entity';
import { AlbumEntity } from '../album/album.entity';

type CreateArgs = {
  readonly name: string;
  readonly duration: number;
  readonly artist: ArtistEntity | null;
  readonly album: AlbumEntity | null;
  readonly id?: string;
};

@Entity('track')
export class TrackEntity {
  @PrimaryColumn('char', { length: 36 })
  readonly id: string;

  @Column()
  private name: string;

  @Column('int')
  private duration: number;

  @ManyToOne((): ObjectType<ArtistEntity> => ArtistEntity, {
    nullable: true,
    lazy: true,
  })
  private artist: Promise<ArtistEntity> | ArtistEntity | null;

  @ManyToOne((): ObjectType<AlbumEntity> => AlbumEntity, {
    nullable: true,
    lazy: true
  })
  private album: Promise<AlbumEntity> | AlbumEntity | null;

  constructor(args: CreateArgs) {
    if (arguments.length === 0) {
      return;
    }

    const { name, duration, artist, album } = args;

    this.name = name;
    this.duration = duration;
    this.artist = artist;
    this.album = album;

    this.id = randomUUID();
  }

  getDuration(): number {
    return this.duration;
  }

  setDuration(duration: number): void {
    this.duration = duration;
  }

  getArtist(): Promise<ArtistEntity> | ArtistEntity | null {
    return this.artist;
  }

  setArtist(artist: ArtistEntity | null): void {
    this.artist = artist;
  }

  getAlbum(): Promise<AlbumEntity> | AlbumEntity | null {
    return this.album;
  }

  setAlbum(album: AlbumEntity | null): void {
    this.album = album;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }
}
