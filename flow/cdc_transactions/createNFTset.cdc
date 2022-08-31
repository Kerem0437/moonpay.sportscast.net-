import NonFungibleToken from 0x631e88ae7f1d7c20
import SportsCastCollectible_NFT from "../../contracts/SportscastCollectibles.cdc"

transaction(series: UInt32,maxEdition: UInt32, ipfsMetadataHashes: {UInt32: String}, metadata: {String: String}) {
    
    // local variable for storing the minter reference
    let minter: &SportsCastCollectible_NFT.Admin
    let targetSeries: &SportsCastCollectible_NFT.Series
    let collection: &SportsCastCollectible_NFT.Collection

    prepare(signer: AuthAccount) {

        // borrow a reference to the NFTMinter resource in storage
        self.minter = signer.borrow<&SportsCastCollectible_NFT.Admin>(from: SportsCastCollectible_NFT.AdminStoragePath)
            ?? panic("Could not borrow a reference to the SportsCastCollectible_NFT Admin resource")

        // borrow a refernce to the receiprients NonFungibleToken.CollectionPublic}
        self.collection = signer.borrow<&SportsCastCollectible_NFT.Collection>(from: SportsCastCollectible_NFT.CollectionStoragePath)
            ?? panic("Could not get the reciepients collection")
        self.targetSeries = self.minter.borrowSeries(seriesId:series)
    }

    execute {

        // create a new nft set for the edition
        let nextSetId:UInt32 = UInt32(SportsCastCollectible_NFT.getAllSeries().length)
        self.targetSeries.addNftSet(
            setId: nextSetId,
            maxEditions: maxEdition,
            ipfsMetadataHashes: ipfsMetadataHashes,
            metadata: metadata
        )
    }
}
