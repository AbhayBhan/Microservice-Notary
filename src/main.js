import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mongoose from 'mongoose';
import { Logger } from 'nestjs-pino';


// Activate this to Log Requests in console.
// async function bootstrap() {
//   const app = await NestFactory.create(AppModule, {bufferLogs : true});
//   app.useLogger(app.get(Logger));
//   await app.listen(process.env.NODE_PORT);
// }

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  mongoose.connect(process.env.MONGO_CONN_KEY)
    .then(async () => {
      await app.listen(process.env.NODE_PORT);
    }).catch((err) => {
      console.log(err);
    })
}

bootstrap();
