import { Order as OrderType } from "../models/order";
import crypto from 'crypto';

export const constructMoonPayUrl = (order:OrderType) => {
    let url = process.env.MOONPAY_BASE_URL as string;
       
        

    url+= "?contractAddress="+process.env.NEXT_PUBLIC_SPORTSCAST_CONTRACT_ADDRESS;
    url+= "&tokenId="+order.nftID
    url += "&walletAddress="+order.account.flowAccount  // padd for things to work
    url += "&listingId="+order._id.toString();
    url+= "&apiKey=" + process.env.MOONPAY_API_KEY
        
    const sig = signNftCheckoutURL(url);
    url+= "&signature=" + sig

    return url
}

const signNftCheckoutURL = (originalUrl:string)=>{

    const signature = crypto
    .createHmac('sha256', process.env.MOONPAY_API_KEY as string)
    .update(new URL(originalUrl).search)
    .digest('base64');

    return encodeURIComponent(signature)

}