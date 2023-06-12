import mongoose from "mongoose";

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
    linkedAccounts : {
        type : [mongoose.Types.ObjectId],
        ref : 'customers',
        default : []
    }
},{
    timestamps : true
});

const RefModel = mongoose.model('referrals', RefSchema);
export default RefModel;