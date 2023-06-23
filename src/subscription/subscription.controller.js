import {Controller, Post, Body, Request} from '@nestjs/common';
import { SubscriptionService } from './subscription.service';

@Controller('api/sub')
export class SubscriptionController{
    constructor(){
        this.subscriptionService = new SubscriptionService();
    }

    @Post('/create')
    createSub(@Body() reqbody){
        return this.subscriptionService.createSubscription(reqbody);
    }

    @Post('/webhook')
    webhookEvents(@Request() reqbody){
        return this.subscriptionService.webhookEvents(reqbody);
    }
}