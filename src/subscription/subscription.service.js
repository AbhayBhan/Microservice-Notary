import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import SUB from 'src/models/sub.model';
import USER from 'src/models/customer.model';
import REF from 'src/models/ref.model';

@Injectable()
export class SubscriptionService {

  // 0 means no plan was/is active
  // 1 means a plan is active
  // 2 means a plan was active
  async getSubscription(id){
    const userId = new mongoose.Types.ObjectId(id);
    const sub = await SUB.findOne({userId});

    if(!sub){
      return {
        status : 0
      }
    }

    if(sub.subscription_Active){
      return {
        status : 1,
        product : sub.subscriptionName,
        startDate : sub.startDate,
        endDate : sub.endDate,
        amount : sub.amount
      }
    }else{
      return {
        status : 2,
        product : sub.subscriptionName,
        startDate : sub.startDate,
        endDate : sub.endDate,
        amount : sub.amount
      }
    }
  }

  async UpgradeSubscription(data) {
    const { customer } = data.object;

    const { amount } = data.object.lines.data[1];

    const { end } = data.object.lines.data[1].period;

    const { product } = data.object.lines.data[1].plan;

    const sub = await SUB.findOne({customerId : customer});

    if(!sub){
      return;
    }

    sub.amount = amount;
    sub.endDate = end;
    sub.subscriptionName = product;

    await sub.save();
  }

  async UpdateSubscription(data) {
    const { customer, amount_paid } = data.object;

    const sub = await SUB.findOne({ customerId: customer });

    if (!sub) {
      return;
    }

    const { end } = data.object.lines.data[0].period;

    sub.amount = amount_paid;
    sub.endDate = end;
    sub.subscription_Active = true;

    const ref = await REF.findOne({ userID: sub.userId });
    ref.userStatus = 'ACTIVE';
    await ref.save();

    await sub.save();
  }

  async CancelSubscription(data) {
    const { subscription } = data.object.items.data[0];

    const sub = await SUB.findOneAndDelete({ subscriptionId: subscription });

    const ref = await REF.findOne({ email: sub.email });
    ref.userStatus = 'INACTIVE';
    await ref.save();
  }

  async AddSubscription(data) {
    const { customer, amount_paid, customer_email, subscription } = data.object;

    const { end, start } = data.object.lines.data[0].period;

    const { product } = data.object.lines.data[0].plan;

    const user = await USER.findOne({ email: customer_email });

    if (!user) {
      return;
    }

    const sub = await SUB.findOne({ email : customer_email });

    if(sub){
      await sub.deleteOne();
    }

    await SUB.create({
      amount: amount_paid,
      customerId: customer,
      userId: user._id,
      email: customer_email,
      subscription_Active: true,
      subscriptionId: subscription,
      subscriptionName: product,
      startDate: start,
      endDate: end,
    });

    const ref = await REF.findOne({ userID: user._id });
    ref.userStatus = 'ACTIVE';
    await ref.save();
  }

  async FailedPayment(data){
    const {customer, amount_remaining, hosted_invoice_url} = data.object;

    const sub = await SUB.findOne({customerId : customer});

    if(!sub){
      return;
    }

    sub.subscription_Active = false;

    const ref = await REF.findOne({userID : sub.userId});

    ref.userStatus = 'INACTIVE';

    await ref.save();
    await sub.save();
  }
}
