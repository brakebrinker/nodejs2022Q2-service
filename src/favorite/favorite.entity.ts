import { FavoriteTypeEnum } from './favorite-type.enum';
import { randomUUID } from 'crypto';

type CreateArgs = {
  readonly type: FavoriteTypeEnum;
  readonly unitId: string;
  readonly id?: string;
}

export class FavoriteEntity {
  readonly id: string;

  readonly type: FavoriteTypeEnum;

  readonly unitId: string;

  constructor(args: CreateArgs) {
    const {
      type,
      unitId,
    } = args;

    this.type = type;
    this.unitId = unitId;

    this.id = randomUUID();
  }
}