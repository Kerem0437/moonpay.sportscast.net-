// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '../../middleware/mongodb';
import { NFTs, Series } from '../../models/NFTS';
import Orders from '../../models/order';
import Accounts from '../../models/account';
import { getFileUrlFromCID } from '../../utils/ipfs';
import { Order, OrderStatus } from '../../models/order';
import { calcualteNFT_SetDataTokenIDStart } from '../../utils/nft';
type Data = any


async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const {
        id
    } = req.query as {
        id: string;
    };
    const start = calcualteNFT_SetDataTokenIDStart(parseInt(id));
    NFTs[parseInt(id)].quantity
    res.status(200).json({
        start,
        quantity : NFTs[parseInt(id)].quantity

    });
}

export default connectDB(handler);