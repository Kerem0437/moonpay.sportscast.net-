import NonFungibleToken from 0x1d7e57aa55817448
import HandyItems from "../../contracts/HandyItems.cdc"

transaction(series: UInt32, edition: UInt32, quantity: UInt32, 
            price: UFix64, isSerial: Bool, metadata: {String: String}) {
    
    // local variable for storing the minter reference
    let minter: &HandyItems.NFTMinter

    prepare(signer: AuthAccount) {

        // borrow a reference to the NFTMinter resource in storage
        self.minter = signer.borrow<&HandyItems.NFTMinter>(from: HandyItems.MinterStoragePath)
            ?? panic("Could not borrow a reference to the NFT minter")
    }

    execute {

        // mint the NFT and deposit it to the recipient's collection
        self.minter.createSet(series: series, edition: edition, 
                                quantity: quantity, price: price, isSerial: isSerial, metadata: metadata)
    }
}
