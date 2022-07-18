import { randomUUID } from 'crypto';

type CreateArgs = {
  readonly name: string;
  readonly grammy: boolean;
  readonly id?: string;
};

export class ArtistEntity {
  readonly id: string;

  private name: string;

  private grammy: boolean;

  constructor(args: CreateArgs) {
    const { name, grammy } = args;

    this.name = name;
    this.grammy = grammy;

    this.id = randomUUID();
  }

  hasGrammy(): boolean {
    return this.grammy;
  }

  setGrammy(grammy: boolean): void {
    this.grammy = grammy;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }
}
