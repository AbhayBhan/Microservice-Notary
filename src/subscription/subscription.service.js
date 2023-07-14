import { Injectable } from '@nestjs/common';
import SUB from 'src/models/sub.model';
import USER from 'src/models/customer.model';
import REF from 'src/models/ref.model';

@Injectable()
export class SubscriptionService {
  async UpgradeSubscription(data) {}

  async UpdateSubscription(data) {}

  async CancelSubscription(data) {
  }

  async AddSubscription(data) {
    const {
      customer,
      amount_paid,
      customer_address,
      customer_email,
      period_start,
      period_end,
      subscription,
    } = data.object;

    const {
      product
    } = data.object.lines.data[0].plan;

    const {_id} = await USER.findOne({email : customer_email});

    await SUB.create({
      amount : amount_paid,
      customerId : customer,
      userId : _id,
      email : customer_email,
      subscription_Active : true,
      subscriptionId : subscription,
      subscriptionName : product,
      startDate : period_start,
      endDate : period_end
    });

    const ref = await REF.findOne({userID : _id});
    ref.userStatus = "ACTIVE";
    await ref.save();
  }
}
