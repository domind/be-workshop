import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import type { Response } from 'express';
import { UrlShortRedirectService } from './url-short-redirect.service';

@Controller()
export class UrlShortRedirectController {
  constructor(
    private readonly urlShortRedirectService: UrlShortRedirectService,
  ) {}

  @ApiOperation({
    summary: 'Redirect to the original URL',
    description: 'Redirect to the original URL',
  })
  @ApiParam({
    name: 'shortId',
    description: 'The short ID of the URL',
    example: '1234567890',
  })
  @Get(':shortId')
  async redirectToUrl(
    @Param('shortId') shortId: string,
    @Res() res: Response,
  ): Promise<void> {
    const url = await this.urlShortRedirectService.getRedirectUrl(shortId);

    if (url && url.trim() !== '') {
      res.status(301).redirect(url);
      return;
    }
    throw new NotFoundException('URL not found');
  }
}
