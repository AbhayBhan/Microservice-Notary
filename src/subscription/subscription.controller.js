import { Controller, Post, Request, Get, Param } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import Stripe from 'stripe';

@Controller('api/sub')
export class SubscriptionController {
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    this.endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;
    this.subscriptionService = new SubscriptionService();
  }

  @Get('/fetch/:id')
  getSubscriptionDetails(@Param('id') id){
    return this.subscriptionService.getSubscription(id);
  }

  @Post('/webhook')
  webhookEvents(@Request() reqbody) {
    const sig = reqbody.headers['stripe-signature'];
    let event = reqbody.body;

    // try {
    //   event = this.stripe.webhooks.constructEvent(reqbody.body, sig, this.endpointSecret);
    // } catch (err) {
    //   throw new HttpException(err.message, HttpStatus.CONFLICT);
    // }

    switch(event.type){
        case('invoice.payment_succeeded') :
          if(event.data.object.billing_reason === 'subscription_create'){
            return this.subscriptionService.AddSubscription(event.data);
          }
          if(event.data.object.billing_reason === 'subscription_cycle'){
            return this.subscriptionService.UpdateSubscription(event.data);
          }
          if(event.data.object.billing_reason === 'subscription_update'){
            return this.subscriptionService.UpgradeSubscription(event.data);
          }
        case('customer.subscription.deleted') :
          return this.subscriptionService.CancelSubscription(event.data);

        case('invoice.payment_failed') :
          if(event.data.object.billing_reason === 'subscription_cycle'){
            return this.subscriptionService.FailedPayment(event.data);
          }
    }
  }
}
