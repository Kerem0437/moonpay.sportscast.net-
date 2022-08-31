import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

const connectDB = (handler: (arg0: NextApiRequest, arg1: NextApiResponse<any>) => any) => async (req:NextApiRequest, res:NextApiResponse) => {

  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return handler(req, res);
  }
  // Use new db connection
  console.log(process.env.MONGODB_URI)
  await mongoose.connect(process.env.MONGODB_URI as string);
  return handler(req, res);
};

export default connectDB;