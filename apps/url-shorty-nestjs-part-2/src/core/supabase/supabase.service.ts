import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

@Injectable()
export class SupabaseService implements OnModuleInit {
  private client: SupabaseClient<Database>;
  private readonly logger = new Logger(SupabaseService.name, {
    timestamp: true,
  });

  constructor(private readonly configService: ConfigService) {}

  onModuleInit(): void {
    const supabaseUrl = this.configService.get<string>('supabase.url');
    const supabaseKey = this.configService.get<string>('supabase.anonKey');

    if (!supabaseUrl || !supabaseKey) {
      this.logger.error(
        `Supabase URL or anon key is not set ${supabaseUrl} ${supabaseKey}`,
      );
      throw new Error('Supabase URL or anon key is not set');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    this.client = createClient<Database>(supabaseUrl, supabaseKey);
    this.logger.log('Supabase client initialized');
  }

  getClient(): SupabaseClient<Database> {
    if (!this.client) {
      this.logger.error('Supabase client not initialized yet');
      throw new Error('Supabase client not initialized yet');
    }
    return this.client;
  }
}
