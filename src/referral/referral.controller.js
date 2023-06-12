import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { ReferralService } from './referral.service';

@Controller('api/ref')
export class ReferralController{
    constructor(){
        this.referralService = new ReferralService();
    }

    @Post('/create-new-ref')
    createRef(@Body() reqBody){
        const {referralId} = reqBody;
        if(referralId){
            return this.referralService.createExRef(reqBody);
        } else {
            return this.referralService.createNewRef(reqBody);
        }
    }

    @Get('/:id')
    getRef(@Param('id') id){
        return this.referralService.retrieveRef(id);
    }
}