import { Body, Controller, Post } from "@nestjs/common";
import { PayoutService } from "./payout.service";

@Controller('api/payout')
export class PayoutController{
    constructor(){
        this.payoutService = new PayoutService();
    }

    @Post('/create-account')
    async CreateAccount(@Body() ReqBody){
        return this.payoutService.CreateExpressAccount(ReqBody);
    }
}