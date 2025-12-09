/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SupabaseService } from '../core';
import { CreateUrlShortDto } from './dto/create-url-short.dto';

@Injectable()
export class UrlShortService {
  constructor(
    private readonly configService: ConfigService,
    private readonly supabaseService: SupabaseService,
  ) {}

  private readonly logger = new Logger(UrlShortService.name, {
    timestamp: true,
  });

  async createUrlShort(
    createUrlShortDto: CreateUrlShortDto,
  ): Promise<{ shortUrl: string }> {
    const supabase = this.supabaseService.getClient();

    const maxRetries = 10;

    for (let retries = 0; retries < maxRetries; retries++) {
      const shortId = this.#generateShortId(8);

      const { error } = await supabase.from('urls').insert([
        {
          long_url: createUrlShortDto.url,
          short_code: shortId,
        },
      ]);

      if (!error) {
        this.logger.log(`Short code ${shortId} created successfully`);
        // Success - return the short URL
        const port = this.configService.get<number>('port', 3000);
        const host = this.configService.get<string>('host', 'http://localhost');
        const shortUrl = `${host}:${port}/${shortId}`;

        return { shortUrl };
      }

      // If it's a unique constraint violation, retry with a new short code
      if (error.code === '23505') {
        this.logger.warn(`Short code ${shortId} already exists, retrying...`);
        continue;
      }

      // For any other database error, throw it immediately
      this.logger.error(
        `Error creating short code ${shortId}: ${error.message}`,
      );
      throw error;
    }

    this.logger.error('All retries exhausted, throwing error');

    throw new InternalServerErrorException(
      'An unexpected error occurred, please try again',
    );
  }

  #generateShortId(length: number): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}
