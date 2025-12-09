import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configuration, LoggerMiddleware, SupabaseModule } from './core';
import { HealthModule } from './health/health.module';
import { UrlShortModule } from './url-short/url-short.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        '.env.development.local',
        '.env.development',
        '.env.production',
      ],
      isGlobal: true,
      load: [configuration],
    }),
    HealthModule,
    UrlShortModule,
    SupabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
