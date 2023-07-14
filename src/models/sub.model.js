import mongoose from "mongoose";

const subSchema = new mongoose.Schema({
    amount : {
        type : Number,
        required : true
    },
    userId : {
        type : mongoose.Types.ObjectId,
        ref : 'customers',
        required : true
    },
    customerId : {
        type : String,
        required : true
    },
    subscriptionName : {
        type : String,
        required : true
    },
    subscription_Active : {
        type : Boolean,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    subscriptionId : {
        type : String, 
        required : true
    },
    startDate : {
        type : Number,
        required : true
    },
    endDate : {
        type : Number,
        required : true
    }
})

const subModel = mongoose.model('subscriptions', subSchema);
export default subModel;