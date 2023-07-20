import { Injectable } from "@nestjs/common";
import Stripe from "stripe";

@Injectable()
export class PayoutService{
    constructor(){
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    }
    
    async CreateExpressAccount(data){
        const {email} = data;

        const bank = await this.stripe.transfers.create({
            destination : "ba_1NVnz92eZvKYlo2CiuhfiIv5",
            amount : 1000,
            currency : 'inr'
        })

        return bank;
    } 

}