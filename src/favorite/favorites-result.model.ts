import { ArtistModel } from '../artist/artist.model';
import { AlbumModel } from '../album/album.model';
import { TrackModel } from '../track/track.model';
import { FavoritesResult } from './favorite.service';
import { ArtistEntity } from '../artist/artist.entity';
import { AlbumEntity } from '../album/album.entity';
import { TrackEntity } from '../track/track.entity';

type CreateArgs = {
  readonly artists: ArtistModel[];
  readonly albums: AlbumModel[];
  readonly tracks: TrackModel[];
};

export class FavoritesResultModel {
  readonly artists: ArtistModel[];

  readonly albums: AlbumModel[];

  readonly tracks: TrackModel[];

  private constructor({ artists, albums, tracks }: CreateArgs) {
    this.artists = artists;
    this.albums = albums;
    this.tracks = tracks;
  }

  static createNewFromFavoritesResult(
    favoritesResult: FavoritesResult,
  ): FavoritesResultModel {
    const artists = favoritesResult.artists.map(
      (artist: ArtistEntity): ArtistModel => {
        return ArtistModel.createNewFromEntity(artist);
      },
    );

    const albums = favoritesResult.albums.map(
      (album: AlbumEntity): AlbumModel => {
        return AlbumModel.createNewFromEntity(album);
      },
    );

    const tracks = favoritesResult.tracks.map(
      (track: TrackEntity): TrackModel => {
        return TrackModel.createNewFromEntity(track);
      },
    );

    return new this({
      artists,
      albums,
      tracks,
    });
  }
}
