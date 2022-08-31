import SportsCastCollectible_NFT from 0x5e639f377602ccc9;

pub struct NFTData {
  pub let id: UInt64
  pub let title: String?
  pub let description: String?
  pub let external_domain_view_url: String?
  pub let media: [NFTMedia?]
  pub let metadata: {String: String?}

  init(
      id: UInt64,
      title: String?,
      description: String?,
      external_domain_view_url: String?,
      media: [NFTMedia?],
      metadata: {String: String?}
  ) {
      self.id = id
      self.title = title
      self.description = description
      self.external_domain_view_url = external_domain_view_url
      self.media = media
      self.metadata = metadata
  }
}

pub struct NFTMedia {
    pub let uri: String?
    pub let mimetype: String?

    init(
        uri: String?,
        mimetype: String?
    ) {
        self.uri = uri
        self.mimetype = mimetype
    }
}



pub fun main(tokenId:UInt64,ownerAddress: Address): [NFTData] {
     let owner = getAccount(ownerAddress)
    // get all the nfts owned by a user 
    
    let col = owner.getCapability(SportsCastCollectible_NFT.CollectionPublicPath)
     .borrow<&{SportsCastCollectible_NFT.SportsCastCollectible_NFTCollectionPublic}>()
     let nft = col!.borrowSportsCastCollectible_NFT(id: tokenId)
     if(nft == nil) {
        return[]
     }
     
     let setMeta = SportsCastCollectible_NFT.getSetMetadata(setId: nft!.setId)!
     let seriesMeta = SportsCastCollectible_NFT.getSeriesMetadata(
         seriesId: SportsCastCollectible_NFT.getSetSeriesId(setId: nft!.setId)!
     )!
     // create the nft object and add it to the list of nfts ( should match Ts type )
     let seriesId = SportsCastCollectible_NFT.getSetSeriesId(setId: nft!.setId)!
    let nftEditions = SportsCastCollectible_NFT.getSetMaxEditions(setId: nft!.setId)!
    let externalTokenViewUrl = "https://sportscast.net/nft/".concat(nft!.id.toString())

    var mimeType = "image"
    if setMeta!["image_file_type"]!.toLower() == "mp4" {
        mimeType = "video/mp4"
    } else if setMeta!["image_file_type"]!.toLower() == "glb" {
        mimeType = "model/gltf-binary"
    }
     return [NFTData(
        id: tokenId,
        title: setMeta!["name"],
        description: setMeta!["description"],
        external_domain_view_url: externalTokenViewUrl,
        media: [
            NFTMedia(uri: setMeta!["image"], mimetype: mimeType),
            NFTMedia(uri: setMeta!["preview"], mimetype: "image")
        ],
        metadata: setMeta!
    )]
    
}