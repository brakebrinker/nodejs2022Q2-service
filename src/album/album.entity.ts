import { randomUUID } from 'crypto';

type CreateArgs = {
  readonly name: string;
  readonly year: number;
  readonly artistId: string | null;
  readonly id?: string;
}

export class AlbumEntity {
  readonly id: string;

  private name: string;

  private year: number;

  private artistId: string | null;

  constructor(args: CreateArgs) {
    const {
      name,
      year,
      artistId,
    } = args;

    this.name = name;
    this.year = year;
    this.artistId = artistId;

    this.id = randomUUID();
  }

  getYear(): number {
    return this.year;
  }

  setYear(year: number): void {
    this.year = year;
  }

  getArtistId(): string | null {
    return this.artistId;
  }

  setArtistId(artistId: string | null): void {
    this.artistId = artistId;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }
}