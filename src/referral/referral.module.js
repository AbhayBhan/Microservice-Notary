import {Module} from "@nestjs/common";
import { ReferralController } from "./referral.controller";
import { ReferralService } from "./referral.service";

@Module({
    providers : [ReferralService],
    controllers : [ReferralController]
})
export class ReferralModule{}