// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '../../middleware/mongodb';
import { NFTs, Series } from '../../models/NFTS';
import Orders from '../../models/order';
import Accounts from '../../models/account';
import { getFileUrlFromCID } from '../../utils/ipfs';
import { Order, OrderStatus } from '../../models/order';
type Data = {
    data: TransactionStatus[]
}

interface TransactionStatus {
    id: string,
    status: string,
    transactionHash: string[],
    statusChangedAt?: string,
    failureReason?: string,
    tokenId: string
}

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const {
        id
    } = req.query as {
        id: string;
    };
    console.log
    // get the order 
    const orders: Order[] = await Orders.find({
        _id: {
            $in: id.split(",")
        }
    });
    // for each order
    const transactionStatus: TransactionStatus[] = [];
    for (const order of orders) {
        transactionStatus.push({
            "id": order._id.toString(),
            "status": order.status  == OrderStatus.NFT_DELIVERED ? "completed" : "pending",
            "transactionHash":order.trasnsactionHashes ?  order.trasnsactionHashes : [],
            "statusChangedAt": order.lastUpdatedAt.toISOString(),
            "failureReason": order.failureReason ? order.failureReason : undefined,
            "tokenId": order.nftID.toString()
        })
    }
    res.status(200).json({
      data : [...transactionStatus]
    });
}

export default connectDB(handler);