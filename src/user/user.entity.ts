import { randomUUID } from 'crypto';
import {
  Column,
  Entity,
  PrimaryColumn
} from 'typeorm';

type CreateArgs = {
  readonly login: string;
  readonly password: string;
  readonly version: number;
  readonly id?: string;
  readonly createdAt?: number;
  readonly updatedAt?: number;
};

@Entity('user')
export class UserEntity {
  @PrimaryColumn('char', { length: 36 })
  readonly id: string;

  @Column()
  readonly login: string;

  @Column()
  private password: string;

  @Column()
  private version: number;

  @Column('int8')
  private readonly createdAt: number;

  @Column('int8')
  private updatedAt: number;

  constructor(args: CreateArgs) {
    if (arguments.length === 0) {
      return;
    }

    const { login, password, version, createdAt = new Date() } = args;

    this.login = login;
    this.password = password;
    this.version = version;

    this.id = randomUUID();
    this.createdAt = new Date(createdAt).getTime();
    this.updatedAt = new Date(createdAt).getTime();
  }

  getCreatedAt(): number {
    return parseInt(this.createdAt.toString());
  }

  getUpdatedAt(): number {
    return parseInt(this.updatedAt.toString());
  }

  getVersion(): number {
    return this.version;
  }

  getPassword(): string {
    return this.password;
  }

  setUpdatedAt(updatedAt: number): void {
    this.updatedAt = updatedAt;
  }

  setPassword(password: string): void {
    this.password = password;
  }

  updateVersion(): void {
    ++this.version;
  }
}
