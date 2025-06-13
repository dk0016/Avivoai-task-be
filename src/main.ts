import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './configuration/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/avivoai-task');

  const options = {
    origin: '*',
    methods: 'GET',
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  };
  app.enableCors(options);
  await app.listen(configuration().port);
  process.stdout.write(
    `app is running in ${configuration().env} mode - port ${configuration().port}\n`,
  );
}
bootstrap();
