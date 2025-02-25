import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation
  app.useGlobalPipes(new ValidationPipe());

  // Enable CORS for frontend
  app.enableCors();
  const PORT = process.env.PORT;
  await app.listen(PORT);
  console.log(`Application is running on: http://localhost:${PORT}/graphql`);
}
bootstrap();
