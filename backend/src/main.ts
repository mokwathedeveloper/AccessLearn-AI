import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // Enable CORS for production and development
  app.enableCors({
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ) => {
      const allowedOrigins = [
        process.env.FRONTEND_URL,
        'https://eduinnovate.vercel.app',
        'http://localhost:3000',
        'http://127.0.0.1:3000',
      ].filter((o): o is string => !!o);

      // Allow if origin is in list or if it's a Vercel preview URL
      if (
        !origin ||
        allowedOrigins.some((o) => origin.startsWith(o)) ||
        origin.endsWith('.vercel.app')
      ) {
        callback(null, true);
      } else {
        logger.warn(`CORS blocked request from origin: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  logger.log(`AI Engine active on port ${port}`);
}
void bootstrap();
