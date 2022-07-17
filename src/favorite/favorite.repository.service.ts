import { Injectable } from '@nestjs/common';
import { favorites } from '../data';
import { FavoriteTypeEnum } from './favorite-type.enum';
import { FavoriteEntity } from './favorite.entity';

@Injectable()
export class FavoriteRepositoryService {
  async getManyByType(type: FavoriteTypeEnum): Promise<FavoriteEntity[]> {
    return favorites.filter(
      (favorite: FavoriteEntity): boolean => favorite.type === type,
    );
  }

  async getOneByUnitIdAndType(
    unitId: string,
    type: FavoriteTypeEnum,
  ): Promise<FavoriteEntity | undefined> {
    return favorites.find(
      (favorite: FavoriteEntity): boolean =>
        favorite.unitId === unitId && favorite.type === type,
    );
  }

  async save(unitId: string, type: FavoriteTypeEnum): Promise<FavoriteEntity> {
    const existedEntity = this.getOneByUnitIdAndType(unitId, type);

    if (existedEntity !== undefined) {
      return existedEntity;
    }

    const favoriteEntity = new FavoriteEntity({
      unitId,
      type,
    });

    favorites.push(favoriteEntity);

    return favoriteEntity;
  }

  async delete(id: string): Promise<void> {
    const userIndex = favorites.findIndex((entity) => entity.id === id);

    favorites.splice(userIndex, 1);
  }
}
