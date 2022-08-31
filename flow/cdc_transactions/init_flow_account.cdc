import NonFungibleToken from 0x631e88ae7f1d7c20
import SportsCastCollectible_NFT from 0xe0fd079994cb1028

pub fun hasSportsCastCollectibleCapability(_ address: Address): Bool {
    return getAccount(address)
      .getCapability<&SportsCastCollectible_NFT.Collection{NonFungibleToken.CollectionPublic, SportsCastCollectible_NFT.SportsCastCollectible_NFTCollectionPublic}>(SportsCastCollectible_NFT.CollectionPublicPath)
      .check()
}

transaction {
    prepare(acct: AuthAccount) {
        if !hasSportsCastCollectibleCapability(acct.address) {
            log(acct.address)
            if acct.borrow<&SportsCastCollectible_NFT.Collection>(from: SportsCastCollectible_NFT.CollectionStoragePath) == nil {
                acct.save(<-SportsCastCollectible_NFT.createEmptyCollection(), to:SportsCastCollectible_NFT.CollectionStoragePath)
            }
            log(acct.borrow<&SportsCastCollectible_NFT.Collection>(from: SportsCastCollectible_NFT.CollectionStoragePath))

            acct.unlink(SportsCastCollectible_NFT.CollectionPublicPath)
            acct.link<&SportsCastCollectible_NFT.Collection{NonFungibleToken.CollectionPublic, SportsCastCollectible_NFT.SportsCastCollectible_NFTCollectionPublic}>(SportsCastCollectible_NFT.CollectionPublicPath, target: SportsCastCollectible_NFT.CollectionStoragePath)
        } 
    }
}
