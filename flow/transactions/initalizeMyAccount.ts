//@ts-ignore
import {transaction, limit,proposer, payer, authorizations, authz, cdc,currentUser} from "@onflow/fcl"
//@ts-ignore
import {invariant} from "@onflow/util-invariant"
import {tx} from "../tx"

const CODE = cdc`
import NonFungibleToken from 0xNonFungibleToken;
import SportsCastCollectible_NFT from 0xSportsCastCollectible_NFT;
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

`

export async function initializeAccount() {
  // prettier-ignore
  const user = await (await currentUser().authenticate());
  debugger
  invariant(user.addr != null, "Tried to initialize an account but no address was supplied")

  return tx(
    [ //@ts-ignore
      transaction(CODE),
      //@ts-ignore
      limit(70),
      //@ts-ignore
      proposer(authz),
      //@ts-ignore
      payer(authz),
      //@ts-ignore
      authorizations([authz])
    ],
    {}
  )
}
