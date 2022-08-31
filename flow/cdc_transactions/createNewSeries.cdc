import NonFungibleToken from 0x631e88ae7f1d7c20
import SportsCastCollectible_NFT from "../../contracts/SportscastCollectibles.cdc"

transaction(metadata: {String: String}) {
    
    // local variable for storing the admin reference
    let admin: &SportsCastCollectible_NFT.Admin

    prepare(signer: AuthAccount) {

        // borrow a reference to the NFTMinter resource in storage
        self.admin = signer.borrow<&SportsCastCollectible_NFT.Admin>(from: SportsCastCollectible_NFT.AdminStoragePath)
            ?? panic("Could not borrow a reference to the SportsCastCollectible_NFT Admin resource")
    }

    execute {

        // get the next nft id 
        let nextId = UInt32(SportsCastCollectible_NFT.getAllSeries().length)
        // mint the NFT and deposit it to the recipient's collection
        self.admin.addSeries(seriesId:nextId,metadata: metadata)
    }
}
