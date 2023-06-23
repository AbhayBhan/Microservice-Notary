import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mongoose from 'mongoose';
import serverlessExpress from '@vendia/serverless-express';

let server;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  mongoose
    .connect(process.env.MONGO_CONN_KEY, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(async () => {
      await app.init();
    })
    .catch((err) => {
      console.log(err);
    });

  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({app : expressApp});
}

export const handler = async (event, context, callback) => {
    server = server ?? (await bootstrap());
    return server(event, context, callback);
}
