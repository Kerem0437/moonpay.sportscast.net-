import NonFungibleToken from 0x631e88ae7f1d7c20
import HandyItems from "../../contracts/HandyItems.cdc"

// This transction uses the NFTMinter resource to mint a new NFT.
//
// It must be run with the account that has the minter resource
// stored at path /storage/NFTMinter.

transaction(recipient: Address, edition: UInt32, quantity: UInt64, price: UInt64, isSerial: Bool, metadata: {String: String}) {
    
    // local variable for storing the minter reference
    let minter: &HandyItems.NFTMinter

    prepare(signer: AuthAccount) {

        // borrow a reference to the NFTMinter resource in storage
        self.minter = signer.borrow<&HandyItems.NFTMinter>(from: HandyItems.MinterStoragePath)
            ?? panic("Could not borrow a reference to the NFT minter")
    }

    execute {
        // get the public account object for the recipient
        let recipient = getAccount(recipient)

        // borrow the recipient's public NFT collection reference
        let receiver = recipient
            .getCapability(HandyItems.CollectionPublicPath)!
            .borrow<&{NonFungibleToken.CollectionPublic}>()
            ?? panic("Could not get receiver reference to the NFT Collection")

        // mint the NFT and deposit it to the recipient's collection
        self.minter.mintNFT(recipient: receiver, edition: edition, 
            quantity: quantity, price: price, isSerial: isSerial, 
            metadata: metadata
        )
    }
}
