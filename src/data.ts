import { UserEntity } from './user/user.entity';
import { ArtistEntity } from './artist/artist.entity';

export const users = [
  new UserEntity({
    login: 'mark',
    password: 'test1234',
    version: 1,
  })
]

export const artists = [
  new ArtistEntity({
    name: 'Fernando',
    grammy: true,
  })
]

