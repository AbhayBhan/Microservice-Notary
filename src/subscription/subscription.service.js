import { Injectable } from '@nestjs/common';
import SUB from 'src/models/sub.model';
import USER from 'src/models/customer.model';
import REF from 'src/models/ref.model';

@Injectable()
export class SubscriptionService {
  async UpgradeSubscription(data) {}

  async UpdateSubscription(data) {
    const {customer, amount_paid} = data.object;

    const sub = await SUB.findOne({customerId : customer});

    if(!sub){
      return;
    }

    const {
      end
    } = data.object.lines.data[0].period;

    sub.amount = amount_paid;
    sub.endDate = end;

    await sub.save();
  }

  async CancelSubscription(data) {
    const {subscription} = data.object.items.data[0];

    const sub = await SUB.findOneAndDelete({subscriptionId : subscription});

    const ref = await REF.findOne({email : sub.email});
    ref.userStatus = "INACTIVE";
    await ref.save();
  }

  async AddSubscription(data) {
    const {
      customer,
      amount_paid,
      customer_email,
      subscription,
    } = data.object;

    const {
      end, start
    } = data.object.lines.data[0].period;

    const {
      product
    } = data.object.lines.data[0].plan;

    const user = await USER.findOne({email : customer_email});

    if(!user){
      return;
    }

    await SUB.create({
      amount : amount_paid,
      customerId : customer,
      userId : user._id,
      email : customer_email,
      subscription_Active : true,
      subscriptionId : subscription,
      subscriptionName : product,
      startDate : start,
      endDate : end
    });

    const ref = await REF.findOne({userID : user._id});
    ref.userStatus = "ACTIVE";
    await ref.save();
  }
}
