import { UserEntity } from './user.entity';
import { Exclude } from 'class-transformer';

type CreateArgs = {
  readonly id: string;
  readonly login: string;
  readonly password: string;
  readonly version: number;
  readonly createdAt: number;
  readonly updatedAt: number;
};

export class UserModel {
  readonly id: string;

  readonly login: string;

  @Exclude()
  readonly password: string;

  readonly version: number;

  readonly createdAt: number;

  readonly updatedAt: number;

  private constructor({
    id,
    login,
    password,
    version,
    createdAt,
    updatedAt,
  }: CreateArgs) {
    this.id = id;
    this.login = login;
    this.password = password;
    this.version = version;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static createNewFromEntity(entity: UserEntity): UserModel {
    return new this({
      id: entity.id,
      login: entity.login,
      password: entity.getPassword(),
      version: entity.getVersion(),
      createdAt: entity.getCreatedAt(),
      updatedAt: entity.getUpdatedAt(),
    })
  }
}
