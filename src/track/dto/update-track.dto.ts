import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  duration: number;

  @IsString()
  @IsNotEmpty()
  artistId: string;

  @IsString()
  @IsNotEmpty()
  albumId: string;
}
