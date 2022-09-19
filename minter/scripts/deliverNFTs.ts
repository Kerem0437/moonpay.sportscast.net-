
import { IAccount } from "../../models/account";
import { Order as OrderType } from "../../models/order";
import { FlowService } from "../services/flow";
import { SportsCastCollectiblesService } from "../services/SportsCastCollectibles";
import getConfig from "../utils/getConfig";
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

    // load the account 
    try{
        await sportsCastCollectiblesService.transferNfts(account.flowAccount,[order.nftID]);
    }catch(e){
        console.log({e});
        throw e
    }
    return true
}