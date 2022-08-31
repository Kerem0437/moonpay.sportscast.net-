import NonFungibleToken from 0x631e88ae7f1d7c20
import SportsCastCollectible_NFT from 0xe0fd079994cb1028

transaction(tokenIds: [UInt64],recipient:Address) {
    
    // local variable for storing the minter reference
    let recipient: PublicAccount
    let collectionRef:&SportsCastCollectible_NFT.Collection
    let depositRef:&SportsCastCollectible_NFT.Collection{SportsCastCollectible_NFT.SportsCastCollectible_NFTCollectionPublic}
    prepare(signer: AuthAccount) {

        // borrow a reference to the NFTMinter resource in storage
        // get the recipients public account object
        self.recipient = getAccount(recipient)

        // borrow a reference to the signer's NFT collection
        self.collectionRef = signer.borrow<&SportsCastCollectible_NFT.Collection>(from: SportsCastCollectible_NFT.CollectionStoragePath)
            ?? panic("Could not borrow a reference to the owner's collection")

        // borrow a public reference to the receivers collection
        self.depositRef = self.recipient .getCapability(SportsCastCollectible_NFT.CollectionPublicPath)
            .borrow<&SportsCastCollectible_NFT.Collection{SportsCastCollectible_NFT.SportsCastCollectible_NFTCollectionPublic}>()
            ?? panic("Couldn't get collection")
    }

    execute {
        for tokenId in tokenIds {
            self.depositRef.deposit(token: <-self.collectionRef.withdraw(withdrawID: tokenId))
        }
    }
}
