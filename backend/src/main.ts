import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from "dotenv"
import { IoAdapter } from '@nestjs/platform-socket.io';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  dotenv.config()
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
  })
  app.useWebSocketAdapter(new IoAdapter(app));
  app.enableVersioning({
    type: VersioningType.URI,
  });


  const config = new DocumentBuilder()
    .setTitle('TODO Portal')
    .setDescription('The Todo Portal API description')
    .setVersion('1.0')
    .addTag('todos')
    .addBearerAuth(
      {
        type: "http",
        bearerFormat: "JWT",
        scheme: "bearer",
        in: "header",
        name: "jwt",
        description: "JWT token validation",
      },
      "bearer")
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
