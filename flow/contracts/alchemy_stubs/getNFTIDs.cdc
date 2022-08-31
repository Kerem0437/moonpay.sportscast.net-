    if let col = owner.getCapability(SportsCastCollectible_NFT.CollectionPublicPath)
        .borrow<&{SportsCastCollectible_NFT.SportsCastCollectible_NFTCollectionPublic}>() {
            ids["SportsCastCollectible_NFT"] = col.getIDs()
        }