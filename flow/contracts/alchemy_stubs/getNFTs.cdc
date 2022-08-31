 case "SportsCastCollectible_NFT": d = getSportsCastCollectible(owner: owner, id: id)



 pub fun getSportsCastCollectible(owner: PublicAccount, id: UInt64): NFTData? {
    let contract = NFTContractData(
        name: "SportsCastCollectible_NFT",
        address: 0x329feb3ab062d289,
        storage_path: "SportsCastCollectible_NFT.CollectionStoragePath",
        public_path: "SportsCastCollectible_NFT.CollectionPublicPath",
        public_collection_name: "SportsCastCollectible_NFT.SportsCastCollectible_NFTCollectionPublic",
        external_domain: "https://sportscast.net/"
    )

    let col = owner.getCapability(SportsCastCollectible_NFT.CollectionPublicPath)
        .borrow<&{SportsCastCollectible_NFT.SportsCastCollectible_NFTCollectionPublic}>()
    if col == nil { return nil }

    let nft = col!.borrowSportsCastCollectible_NFT(id: id)
    if nft == nil { return nil }

    let setMeta = SportsCastCollectible_NFT.getSetMetadata(setId: nft!.setId)!
    let seriesMeta = SportsCastCollectible_NFT.getSeriesMetadata(
        seriesId: SportsCastCollectible_NFT.getSetSeriesId(setId: nft!.setId)!
    )

    let seriesId = SportsCastCollectible_NFT.getSetSeriesId(setId: nft!.setId)!
    let nftEditions = SportsCastCollectible_NFT.getSetMaxEditions(setId: nft!.setId)!
    let externalTokenViewUrl = setMeta!["external_url"]!.concat("/nft/").concat(nft!.id.toString())

    var mimeType = "image"
    if setMeta!["image_file_type"]!.toLower() == "mp4" {
        mimeType = "video/mp4"
    } else if setMeta!["image_file_type"]!.toLower() == "glb" {
        mimeType = "model/gltf-binary"
    }

    return NFTData(
        contract: contract,
        id: nft!.id,
        uuid: nft!.uuid,
        title: setMeta!["name"],
        description: setMeta!["description"],
        external_domain_view_url: externalTokenViewUrl,
        token_uri: nil,
        media: [
            NFTMedia(uri: setMeta!["image"], mimetype: mimeType),
            NFTMedia(uri: setMeta!["preview"], mimetype: "image")
        ],
        metadata: {
            "editionNumber": nft!.editionNum.toString(),
            "editionCount": nftEditions!.toString(),
            "set_id": nft!.setId.toString(),
            "series_id": seriesId!.toString()
        },
    )
}