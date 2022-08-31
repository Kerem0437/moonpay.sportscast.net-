import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import HandyItems from "../../contracts/HandyItems.cdc"

pub struct AccountItem {
  pub let itemID: UInt64
  pub let name: String
  pub let tokenURI: String
  pub let color: String
  pub let info: String
  pub let resourceID: UInt64
  pub let owner: Address

  init(itemID: UInt64, name: String, tokenURI: String, color: String, info: String, resourceID: UInt64, owner: Address) {
    self.itemID = itemID
    self.name = name
    self.tokenURI = tokenURI
    self.color = color
    self.info = info
    self.resourceID = resourceID
    self.owner = owner
  }
}

pub fun main(address: Address, itemID: UInt64): AccountItem? {
  if let collection = getAccount(address).getCapability<&HandyItems.Collection{NonFungibleToken.CollectionPublic, HandyItems.HandyItemsCollectionPublic}>(HandyItems.CollectionPublicPath).borrow() {
    if let item = collection.borrowHandyItem(id: itemID) {
      return AccountItem(itemID: itemID, name: item.name, tokenURI: item.tokenURI, color: item.color, info: item.info, resourceID: item.uuid, owner: address)
    }
  }

  return nil
}
