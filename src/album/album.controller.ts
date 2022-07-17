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
  UseInterceptors,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumModel } from './album.model';
import { AlbumEntity } from './album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('')
  async getAlbums(): Promise<AlbumModel[]> {
    const albums = await this.albumService.findMany();

    return albums.map((album: AlbumEntity): AlbumModel => {
      return AlbumModel.createNewFromEntity(album);
    });
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getAlbum(
    @Param('id', new ParseUUIDPipe()) albumId: string,
  ): Promise<AlbumModel> {
    const album = await this.albumService.getOneOrFail(albumId);

    return AlbumModel.createNewFromEntity(album);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('')
  async create(@Body() dto: CreateAlbumDto): Promise<AlbumModel> {
    const album = await this.albumService.create(dto);

    return AlbumModel.createNewFromEntity(album);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) albumId: string,
    @Body() dto: UpdateAlbumDto,
  ): Promise<AlbumModel> {
    const album = await this.albumService.update(albumId, dto);

    return AlbumModel.createNewFromEntity(album);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(
    @Param('id', new ParseUUIDPipe()) albumId: string,
  ): Promise<void> {
    await this.albumService.delete(albumId);
  }
}
