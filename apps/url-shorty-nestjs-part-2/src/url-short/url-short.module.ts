import { Module } from '@nestjs/common';
import { UrlShortRedirectController } from './url-short-redirect.controller';
import { UrlShortRedirectService } from './url-short-redirect.service';
import { UrlShortController } from './url-short.controller';
import { UrlShortService } from './url-short.service';

@Module({
  controllers: [UrlShortController, UrlShortRedirectController],
  providers: [UrlShortService, UrlShortRedirectService],
})
export class UrlShortModule {}
