import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  index(): string {
    return 'This will return all movies';
  }

  @Get('search')
  search(@Query('year') searchingYear: string): string {
    return `We are searching for a movie made after: ${searchingYear}`;
  }

  @Get(':id')
  view(@Param('id') movieId: string): string {
    return `This will return a single movie with the id: ${movieId}`;
  }

  @Post()
  create(@Body() movieData) {
    return movieData;
  }

  @Delete(':id')
  delete(@Param('id') movieId: string): string {
    return `This will delete a movie with the id: ${movieId}`;
  }

  @Patch(':id')
  patch(@Param('id') movieId: string, @Body() updateData): string {
    return {
      updatedMovie: movieId,
      ...updateData,
    };
  }
}
