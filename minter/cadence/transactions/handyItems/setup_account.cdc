import NonFungibleToken from 0x1d7e57aa55817448
import HandyItems from 0x212341b58cc3bfb7

// This transaction configures an account to hold Handy Items.

transaction {
    prepare(signer: AuthAccount) {
        // if the account doesn't already have a collection
        if signer.borrow<&HandyItems.Collection>(from: HandyItems.CollectionStoragePath) == nil {

            // create a new empty collection
            let collection <- HandyItems.createEmptyCollection()
            
            // save it to the account
            signer.save(<-collection, to: HandyItems.CollectionStoragePath)

            // create a public capability for the collection
            signer.link<&HandyItems.Collection{NonFungibleToken.CollectionPublic, HandyItems.HandyItemsCollectionPublic}>(HandyItems.CollectionPublicPath, target: HandyItems.CollectionStoragePath)
        }
    }
}
