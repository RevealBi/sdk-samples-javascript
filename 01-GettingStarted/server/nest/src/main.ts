import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import reveal from 'reveal-sdk-node';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.use("/", reveal());

  await app.listen(process.env.PORT ?? 5111);
}
bootstrap();
