import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication): void {
  const documentBuilder = new DocumentBuilder()
    .setTitle('API')
    .setDescription('Api Document')
    .setVersion('1.0.0')
    .addBearerAuth({ type: 'apiKey', name: 'Authorization', in: 'header' });

  if (process.env.API_VERSION) {
    documentBuilder.setVersion(process.env.API_VERSION);
  }

  const document = SwaggerModule.createDocument(app, documentBuilder.build());
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  console.info(`Documentation: http://localhost:${process.env.PORT}/api/docs`);
}
