import { Schema, model,models  } from 'mongoose';

export interface IAccount {
    firstLoginDate: Date;
    lastLoginDate: Date;
    flowAccount: string;
    firstName: string;
    lastName: string;
}

const accountSchema = new Schema<IAccount>({
    flowAccount: { type: String, required: true },
    firstLoginDate: { type: Date, required: true },
    lastLoginDate: { type: Date, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
});



export default models.Account || model<IAccount>('Account', accountSchema);