import { randomUUID } from 'crypto';
import { Column, Entity, PrimaryColumn } from 'typeorm';

type CreateArgs = {
  readonly name: string;
  readonly grammy: boolean;
  readonly id?: string;
};

@Entity('artist')
export class ArtistEntity {
  @PrimaryColumn('char', { length: 36 })
  readonly id: string;

  @Column()
  private name: string;

  @Column({ type: Boolean })
  private grammy: boolean;

  constructor(args: CreateArgs) {
    if (arguments.length === 0) {
      return;
    }

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
