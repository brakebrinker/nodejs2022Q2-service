import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  year: number;

  @IsString()
  @IsNotEmpty()
  artistId: string;
}
