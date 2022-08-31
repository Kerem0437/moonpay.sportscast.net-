
import { FlowService } from "../services/flow";
import { SportsCastCollectiblesService } from "../services/SportsCastCollectibles";
import getConfig from "../utils/getConfig";
export default async () => {

    const flowService = new FlowService(
        config.minterAddress,
        config.minterPrivateKeyHex,
        config.minterAccountKeyIndex
    );

    const handyItemsService = new SportsCastCollectiblesService(
        flowService,
        config.nonFungibleTokenAddress,
        config.minterAddress
    );
    try{
        await handyItemsService.setupAccount();
    }catch(e){
        console.log({e});
        throw e
    }
    return true
}