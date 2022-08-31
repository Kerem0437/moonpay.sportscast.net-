import mongoose, { Schema, model,models  } from 'mongoose';
import { Account } from 'next-auth';
import { IPotentialSale } from './order';


export enum SaleStatus {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    CANCLED = 'CANCLED',
}


export interface ISale {
    potentialSale : IPotentialSale;

}

const saleSchema = new Schema<ISale>({
    potentialSale : {  ref: 'PotentialSale', type: mongoose.Types.ObjectId, required: true },

});



export default models.Sale || model<ISale>('Sale', saleSchema);