import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mongoose from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  mongoose
    .connect(process.env.MONGO_CONN_KEY, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(async () => {
      console.log("Mongoose Connection Made");
      await app.listen(process.env.NODE_PORT);
    })
    .catch((err) => {
      console.log(err);
    });
}

bootstrap();
