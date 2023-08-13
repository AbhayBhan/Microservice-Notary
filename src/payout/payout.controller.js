import { Body, Controller, Get, Post } from "@nestjs/common";
import { PayoutService } from "./payout.service";

@Controller('api/payout')
export class PayoutController{
    constructor(){
        this.payoutService = new PayoutService();
    }

    @Get('/get-oauth-link')
    async GetConnectLink(){
        
    }

    @Post('/create-account')
    async CreateAccount(@Body() ReqBody){
        return this.payoutService.CreateExpressAccount(ReqBody);
    }
}