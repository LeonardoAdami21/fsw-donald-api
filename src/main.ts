import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { appPort, prismaUrl } from './env/envoriment';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';
import { initSwagger } from './app.swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  app.useGlobalFilters();
  app.disable('x-powered-by');
  app.enableCors({
    origin: '*',
  });
  initSwagger(app);

  const logger = new Logger('NestApplication');
  await app.listen(appPort, '0.0.0.0', async () => {
    logger.log(`Running At: ${await app.getUrl()}`);
    logger.log(`Documentation: ${await app.getUrl()}/v2/docs`);
    logger.log(`Database is connected: ${prismaUrl}`);
  });
}
bootstrap();
