import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //process.env['AUTH_SECRET'] = 'lala==========';

  await app.listen(3000);
}
bootstrap();
