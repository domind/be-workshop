import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { APP_VERSION } from './version';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Url Shorty API')
    .setDescription('API for Url Shorty')
    .setVersion(APP_VERSION)
    // .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  //http://localhost:3000/swagger lub http://localhost:3000/swagger-json

  const port = process.env.PORT || 3000;
  await app.listen(port);

  Logger.log(`Server is running on http://localhost:${port}`, 'Bootstrap');
}

bootstrap();
