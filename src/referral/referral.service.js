import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import REF from 'src/models/ref_object_model';
import { generateRefCode } from 'src/utils/ref_code_generator';

@Injectable()
export class ReferralService {
  async createNewRef(reqBody) {
    const { userId } = reqBody;

    if (!userId)
      throw new HttpException('UserID Not Found!', HttpStatus.NOT_FOUND);

    const userID = new mongoose.Types.ObjectId(userId);

    const refExists = await REF.find({ userID });

    if (refExists.length > 0)
      throw new HttpException('Referral Exists!', HttpStatus.CONFLICT);

    const refCode = await generateRefCode();

    try {
      const newRefObject = await REF.create({
        userID,
        referralID: refCode,
        userStatus: 'SIGNED_UP',
      });

      return newRefObject;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async createExRef(reqBody) { // Creates a ref with existing ReferralID.
    const { userId, referralId } = reqBody;

    if (!userId)
      throw new HttpException('UserID Not Found!', HttpStatus.NOT_FOUND);

    const userID = new mongoose.Types.ObjectId(userId);

    const refExists = await REF.findOne({ userID });

    if (refExists)
      throw new HttpException('Referral Exists!', HttpStatus.CONFLICT);
    
    const parentRef = await REF.findOne({referralID : referralId});

    if(!parentRef) 
      throw new HttpException('Invalid Referral Code!', HttpStatus.CONFLICT);

    try {
      const newRefObject = await REF.create({
        userID,
        referralID: referralId,
        userStatus: 'SIGNED_UP',
      });

      parentRef.linkedAccounts.push(userID);

      await parentRef.save();

      return newRefObject;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async retrieveRef(userId){
    
  }
}
