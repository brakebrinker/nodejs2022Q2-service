import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors, UsePipes, ValidationPipe,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistModel } from './artist.model';
import { ArtistEntity } from './artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('')
  async getArtists(): Promise<ArtistModel[]> {
    const artists = await this.artistService.findMany();

    return artists.map((artist: ArtistEntity): ArtistModel => {
      return ArtistModel.createNewFromEntity(artist);
    });
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getArtist(
    @Param('id', new ParseUUIDPipe()) artistId: string,
  ): Promise<ArtistModel> {
    const artist = await this.artistService.getOneOrFail(artistId);

    return ArtistModel.createNewFromEntity(artist);
  }

  @UsePipes(new ValidationPipe())
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('')
  async create(@Body() dto: CreateArtistDto): Promise<ArtistModel> {
    const artist = await this.artistService.create(dto);

    return ArtistModel.createNewFromEntity(artist);
  }

  @UsePipes(new ValidationPipe())
  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) artistId: string,
    @Body() dto: UpdateArtistDto,
  ): Promise<ArtistModel> {
    const artist = await this.artistService.update(artistId, dto);

    return ArtistModel.createNewFromEntity(artist);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(
    @Param('id', new ParseUUIDPipe()) artistId: string,
  ): Promise<void> {
    await this.artistService.delete(artistId);
  }
}
