import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { appPort, nodeEnv } from './env/envoriment';

export const initSwagger = (app: INestApplication) => {
  const HOST =
    nodeEnv === 'development'
      ? `http://127.0.0.1:${appPort}/v2`
      : 'https://api.script-recuperacao.com.br/v2';

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Fws Donald API')
    .addServer('https://api.fws-donald-api.com.br', 'Servidor de Produção')
    .addServer(`http://localhost:${appPort}`, 'Servidor Local')
    .addServer(
      `https://api-html.fws-donald-api.com.br`,
      'Servidor de Homologação',
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Insira o Token JWT',
        in: 'header',
      },
      'JWT-auth',
    )
    .setVersion('3.1.5')
    .setLicense('MIT', 'https://opensource.org/license/mit/')
    .setDescription('API REST para o Fws Donald')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/v2/docs', app, document, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
      filter: true,
      docExpansion: 'none',
      tagsSorter: 'alpha',
      operationsSorter: 'method',
      urls: [{ url: `${HOST}/docs-json` }],
    },
  });
};
