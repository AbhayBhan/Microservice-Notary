import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class SubscriptionService {
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    this.endpointSecret = "whsec_ce4581159005ef971fbc95e7bd44523794033bcac5b9600d72cc34d73fd888be";
  }

  async webhookEvents(reqbody) {
    let event = reqbody.body;
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log(
          `PaymentIntent for ${paymentIntent.amount} was successful!`,
        );
        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        break;
      case 'payment_method.attached':
        const paymentMethod = event.data.object;
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod);
        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }

    return event;
  }
}
