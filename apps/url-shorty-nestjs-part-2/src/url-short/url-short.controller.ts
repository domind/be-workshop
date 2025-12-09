import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateUrlShortDto } from './dto/create-url-short.dto';
import { UrlShortService } from './url-short.service';

@Controller('api/url')
export class UrlShortController {
  constructor(private readonly urlShortService: UrlShortService) {}

  @ApiOperation({
    summary: 'Create a new URL short',
    description: 'Create a new URL short',
  })
  @ApiBody({
    type: CreateUrlShortDto,
    description: 'Create a new URL short',
    examples: {
      'example 1': {
        value: {
          url: 'https://www.example.com',
        },
      },
    },
  })
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  createUrlShort(@Body() createUrlShortDto: CreateUrlShortDto) {
    return this.urlShortService.createUrlShort(createUrlShortDto);
  }
}
