
import { NFTs } from "../../models/NFTS";
import { FlowService } from "../services/flow";
import { SportsCastCollectiblesService } from "../services/SportsCastCollectibles";
import getConfig from "../utils/getConfig";
export default async () => {
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
    try{
        let nftSets = await sportsCastCollectiblesService.getAllNFT_DataSets();
        let series = await sportsCastCollectiblesService.getAllSeries();
        
        let lastID = nftSets.length - 1 ;
        let ourLastID = NFTs[NFTs.length-1].id;
        console.log({
            nftSets,
            series,
            lastID,
            ourLastID
    
        })
        
        while(lastID < ourLastID){
            lastID++;
            console.log({
                lastID,
                ourLastID,
                seriesExists:series.length,
                setExists : nftSets.length,
        
            })
            // make sure the series exists , if not create it 
            let seriesExists = series.length >= lastID;
            
            if(!seriesExists){
                // get the nft set for this series
                let nftSet = NFTs[lastID];
                console.log(`Creating series ${nftSet.series_id}`);
                await sportsCastCollectiblesService.createSeries(nftSet.series_id);
                console.log(`Created series ${nftSet.series_id}`);
            }
            // create the nft set for the series
            
            // check if the set already exists 
            let setExists = nftSets.length >= lastID;
            if(!setExists){
                console.log(`Creating nft set ${lastID}`);
                await sportsCastCollectiblesService.createSet(lastID);
                console.log(`Created nft set ${lastID}`);
            }
           
          
         
        }

    }catch(e){
        console.log({e});
        throw e
    }
    return true
}