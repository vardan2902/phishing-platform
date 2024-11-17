import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: '*',
    credentials: true,
    methods: 'GET,POST',
    allowedHeaders: '*',
  });

  const options = new DocumentBuilder()
    .setTitle('Phishing API')
    .setDescription('Phishing API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: true,
    }),
  );

  const configService = app.get(ConfigService);
  const APP_PORT = configService.get<number>('port');

  await app.listen(APP_PORT, () => {
    console.log(`Server listening on port: ${APP_PORT}`);
  });
}

bootstrap();
