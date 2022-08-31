// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '../../../../../middleware/mongodb';
import { NFTs, Series } from '../../../../../models/NFTS';
import Orders, { OrderStatus } from '../../../../../models/order';
import Accounts from '../../../../../models/account';
import deliverNFT from '../../../../../minter/scripts/deliverNftViaMoonPay';
type Data = {
    transactionID: string;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const { 
        contractId, 
        tokenId
    } = req.query;

    const {
        listingId 
    } = req.body;

    console.log({
        contractId,
        tokenId,
        listingId
    })
    // get the order 
    const order = await Orders.findOne({
        _id: listingId
    });

    const account = await Accounts.findOne({
        _id: order.account
    });
    if(!order)
        throw new Error("Order not found");

    // get the set and series details
    const set = NFTs[order.editionID];
    if(!set)
        throw new Error("Set not found");
    if(!set.forSales)
        throw new Error("Set not for sale");
    const series = Series[set.series_id];
    if(!series)
        throw new Error("Series not found");

    await Orders.updateOne({
        _id: listingId
    }, {
        $set: {
            status: OrderStatus.PAYMENT_RECEIVED,
            lastUpdatedAt : new Date() 
        }
    });

    // initate the delivery to run in the background and pass the transactino id back
    const transactionId = await deliverNFT(order,account);

    // update the order with the transaction id
    await Orders.updateOne({
        _id: listingId
    },{ 
        $set : { lastUpdatedAt : new Date() }, 
        $push: { trasnsactionHashes: transactionId } 
    });


    res.status(200).json({ 
        transactionID: transactionId
    });
}

export default connectDB(handler);