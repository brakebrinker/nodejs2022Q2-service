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
  UseInterceptors
} from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackModel } from './track.model';
import { TrackEntity } from './track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('')
  async getTracks(): Promise<TrackModel[]> {
    const tracks = await this.trackService.findMany();

    return tracks.map((track: TrackEntity): TrackModel => {
      return TrackModel.createNewFromEntity(track);
    })
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getTrack(@Param('id', new ParseUUIDPipe()) trackId: string): Promise<TrackModel> {
    const track = await this.trackService.getOneOrFail(trackId);

    return TrackModel.createNewFromEntity(track);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('')
  async create(@Body() dto: CreateTrackDto): Promise<TrackModel> {
    const track = await this.trackService.create(dto);

    return TrackModel.createNewFromEntity(track);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) trackId: string,
    @Body() dto: UpdateTrackDto,
  ): Promise<TrackModel> {
    const track = await this.trackService.update(trackId, dto);

    return TrackModel.createNewFromEntity(track);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) trackId: string): Promise<void> {
    await this.trackService.delete(trackId);
  }
}
