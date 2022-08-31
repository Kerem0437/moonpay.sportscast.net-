import mongoose, { Schema, model,models  } from 'mongoose';
import { IAccount } from './account';


export enum OrderStatus {
    PENDING = 'PENDING',
    PAYMENT_RECEIVED = 'PAYMENT_RECEIVED',
    NFT_DELIVERED = 'NFT_DELIVERED',
    CANCLED = 'CANCLED',
    ERROR = 'ERROR'

}


export interface IOrder {
    account : IAccount;
    seriesID : number;
    editionID : number;
    nftID : number;
    expirationDate : Date;
    price : number;
    status : OrderStatus;
    paymentReceivedAt? : Date;

    trasnsactionHashes : string[];
    failureReason? : string;
    lastUpdatedAt : Date;
}

export interface Order extends mongoose.Document, IOrder { }

const OrderSchema = new Schema<IOrder>({
    account : {  ref: 'Account', type: mongoose.Types.ObjectId, required: true },
    seriesID : { type: Number, required: true },
    editionID : { type: Number, required: true },
    nftID : { type: Number, required: true },
    expirationDate : { type: Date, required: true },
    price : { type: Number, required: true },
    status : { type: String, required: true },
    paymentReceivedAt : { type: Date },
    trasnsactionHashes : [{ type: String }],
    failureReason : { type: String },
    lastUpdatedAt : { type: Date, default: Date.now }
});



export default models.Order || model<IOrder>('Order', OrderSchema);