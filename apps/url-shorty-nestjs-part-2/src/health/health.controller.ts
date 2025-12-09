import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @ApiOperation({
    summary: 'Get health status',
    description: 'Get the health status of the application',
  })
  @Get()
  getHealth(): { status: string } {
    return this.healthService.getHealth();
  }
}
