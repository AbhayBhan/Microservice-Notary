import REF from "src/models/ref.model";

export async function processReferralRetrieval({referralID, userID, userStatus, linkedAccounts, masterReferrer}){
    let res = {referralId : referralID, userId : userID, userStatus, masterReferrer, linkedAccounts : []};
    
    await Promise.all(linkedAccounts.map( async (ref) => {
        const { userStatus } = await REF.findOne({ userID: ref._id });  
        res.linkedAccounts.push({...ref._doc, status : userStatus});
    }))

    return res;
}