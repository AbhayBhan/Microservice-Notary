import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ReferralModule } from './referral/referral.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { PayoutModule } from './payout/payout.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ReferralModule,
    SubscriptionModule,
    PayoutModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
