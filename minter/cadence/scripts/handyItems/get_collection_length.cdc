import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import HandyItems from "../../contracts/HandyItems.cdc"

// This script returns the size of an account's HandyItems collection.

pub fun main(address: Address): Int {
    let account = getAccount(address)

    let collectionRef = account.getCapability(HandyItems.CollectionPublicPath)!
        .borrow<&{NonFungibleToken.CollectionPublic}>()
        ?? panic("Could not borrow capability from public collection")
    
    return collectionRef.getIDs().length
}
