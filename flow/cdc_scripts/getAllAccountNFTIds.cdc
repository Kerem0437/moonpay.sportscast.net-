import SportsCastCollectible_NFT from 0x5e639f377602ccc9;

pub struct NFTData {
    pub let metadata: {String: String}
    pub let seriesMetadata: {String: String}

    init(metadata: {String: String},seriesMetadata: {String: String}) {
        self.metadata = metadata
        self.seriesMetadata = seriesMetadata
    }
}


pub fun main(ownerAddress: Address): [UInt64] {
     let owner = getAccount(ownerAddress)
    // get all the nfts owned by a user 
    
    let col = owner.getCapability(SportsCastCollectible_NFT.CollectionPublicPath)
        .borrow<&{SportsCastCollectible_NFT.SportsCastCollectible_NFTCollectionPublic}>() 
    if (col == nil) {
        return []
    }
    return col!.getIDs()
    
}