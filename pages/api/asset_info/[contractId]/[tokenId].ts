// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '../../../../middleware/mongodb';
import { NFTs, Series } from '../../../../models/NFTS';
import Orders from '../../../../models/order';
import Accounts from '../../../../models/account';
import { getFileUrlFromCID } from '../../../../utils/ipfs';
type Data = {
    "tokenId" : number;
    "contractAddress" : string;
    "name" : string;
    "collection" : string;
    "imageUrl" : string;  // TODO: get the image url from the nft
    "explorerUrl" :string;
    "price" :number;
    "priceCurrencyCode" : string;
    "quantity" : number;
    "sellType" : string;
    "sellerAddress": string;
    "flow" : string;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const { 
        contractId, 
        tokenId,
        listingId 
    } = req.query;

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

    // send a fetch request too https://api.moonpay.com/v3/currencies/btc/ask_price?apiKey=process.env.NEXT_PUBLIC_MOONPAY_API_KEY
    const priceMap = await (await fetch(`https://api.moonpay.com/v3/currencies/flow/ask_price?apiKey=${process.env.MOONPAY_API_KEY}`)).json(); 
    // make a quick request to ge the flow price 
    const priceInFlow = set.priceInUsd / priceMap["USD"] ;


    res.status(200).json({ 
        "tokenId" : order.nftID,
        "contractAddress" : process.env.SPORTSCAST_CONTRACT_ADDRESS as string,
        "name" : set.metadata.name,
        "collection" : series.metadata.name,
        "imageUrl" : getFileUrlFromCID(set.metadata.image), // TODO: get the image url from the nft
        "explorerUrl" : process.env.NEXT_PUBLIC_URL + "/nft/" + order.nftID,
        "price" : priceInFlow,
        "priceCurrencyCode" : "flow",
        "quantity" : 1,
        "sellType" : "Primary",
        "sellerAddress": "",
        "flow" : "Lite",
    });
}

export default connectDB(handler);