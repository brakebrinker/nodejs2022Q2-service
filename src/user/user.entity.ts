import { randomUUID } from 'crypto';

type CreateArgs = {
  readonly login: string;
  readonly password: string;
  readonly version: number;
  readonly id?: string;
  readonly createdAt?: number;
  readonly updatedAt?: number;
};

export class UserEntity {
  readonly id: string;

  readonly login: string;

  private password: string;

  private version: number;

  private readonly createdAt: number;

  private updatedAt: number;

  constructor(args: CreateArgs) {
    const { login, password, version, createdAt = new Date() } = args;

    this.login = login;
    this.password = password;
    this.version = version;

    this.id = randomUUID();
    this.createdAt = new Date(createdAt).getTime();
    this.updatedAt = new Date(createdAt).getTime();
  }

  getCreatedAt(): number {
    return new Date(this.createdAt).getTime();
  }

  getUpdatedAt(): number {
    return new Date(this.updatedAt).getTime();
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
