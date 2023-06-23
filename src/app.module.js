import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { ReferralModule } from './referral/referral.module';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
  imports: [LoggerModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ReferralModule, SubscriptionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
