import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP', { timestamp: true });

  use(request: Request, _response: Response, next: NextFunction): void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { ip, method, path: url, body } = request;
    const userAgent = request.get('user-agent') || '';

    if (body) {
      this.logger.log(`${method} ${url} - ${userAgent} ${ip}`, body);
    } else {
      this.logger.log(`${method} ${url} - ${userAgent} ${ip}`);
    }

    next();
  }
}
