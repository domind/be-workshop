/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { SupabaseService } from '../core';

@Injectable()
export class UrlShortRedirectService {
  private readonly logger = new Logger(UrlShortRedirectService.name, {
    timestamp: true,
  });

  constructor(private readonly supabaseService: SupabaseService) {}

  async getRedirectUrl(shortId: string): Promise<string> {
    this.logger.log(`Getting redirect URL for shortId: ${shortId}`);

    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase
      .from('urls')
      .select('long_url')
      .eq('short_code', shortId)
      .single();

    if (error || !data) {
      this.logger.error(
        `Error getting redirect URL for shortId: ${shortId}`,
        error,
      );
      throw new NotFoundException('URL not found');
    } else {
      this.logger.log(
        `Redirect URL found for shortId: ${shortId} - ${data.long_url}`,
      );
      return data.long_url;
    }
  }
}
