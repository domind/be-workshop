import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name, { timestamp: true });

  getHealth(): { status: string } {
    this.logger.log('Health check');
    return { status: 'ok' };
  }
}
