import mongoose, { trusted } from "mongoose";
import CUSTOMER from "./customer.model";

const RefSchema = new mongoose.Schema({
    referralID : {
        type : String,
        required : true
    },
    userID : {
        type : mongoose.Types.ObjectId,
        ref : 'customers',
        required : true
    },
    userStatus : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    linkedAccounts : {
        type : [mongoose.Types.ObjectId],
        ref : 'customers',
        default : []
    },
    masterReferrer : {
        type : mongoose.Types.ObjectId,
        ref : 'customers',
        default : null
    }
},{
    timestamps : true
});

const RefModel = mongoose.model('referrals', RefSchema);
export default RefModel;