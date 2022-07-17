import { UserEntity } from './user/user.entity';
import { ArtistEntity } from './artist/artist.entity';
import { AlbumEntity } from './album/album.entity';

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

export const albums = [
  new AlbumEntity({
    name: 'Passion',
    year: 2022,
    artistId: artists[0].id
  })
]

