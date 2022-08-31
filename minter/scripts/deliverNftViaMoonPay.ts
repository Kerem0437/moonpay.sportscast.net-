
import { IAccount } from "../../models/account";
import Orders, { Order as OrderType , OrderStatus } from "../../models/order";
import { FlowService } from "../services/flow";
import { SportsCastCollectiblesService } from "../services/SportsCastCollectibles";
import getConfig from "../utils/getConfig";

/**
 * Initiate the delivery to run in the background and returns the transaction id
 */
export default async (order:OrderType,account:IAccount) => {
    const config = await getConfig();
    const flowService = new FlowService(
        config.minterAddress,
        config.minterPrivateKeyHex,
        config.minterAccountKeyIndex
    );

    const sportsCastCollectiblesService = new SportsCastCollectiblesService(
        flowService,
        config.nonFungibleTokenAddress,
        config.minterAddress
    );

    // send the transaction then just return the id without waiting for the result
    try{
        const transaction = await sportsCastCollectiblesService
        .transferNftsAsync(
            account.flowAccount,
            [order.nftID],
            (tx)=>updateOrderResultDelivered(order,tx.blockId),
            (e)=>updateOrderResultError(order,e.toString())
        ) as {
            transactionId: string;
        };
        return transaction.transactionId;
        
        
    }catch(e:any){
        console.log({e});
        updateOrderResultError(order,e.toString());
        throw e
    }
}

const updateOrderResultDelivered = async (order:OrderType,transactionHash:string) => {
    return Orders.updateOne({
        _id: order._id.toString()
    }, {
        $set: {
            status: OrderStatus.NFT_DELIVERED,
            lastUpdatedAt : new Date(),
        },
        $push: { trasnsactionHashes: transactionHash } 
    });
}

const updateOrderResultError = async (order:OrderType,error:string) => {
    return Orders.updateOne({
        _id: order._id.toString()
    }, {
        $set: {
            status: OrderStatus.ERROR,
            lastUpdatedAt : new Date(),
            failureReason: error
        }
    });
}