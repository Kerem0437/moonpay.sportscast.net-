//@ts-ignore
import {transaction, limit, proposer, payer, authorizations, authz, cdc,currentUser,args,arg,t} from "@onflow/fcl"
//@ts-ignore
import {invariant} from "@onflow/util-invariant"
import {tx} from "../tx"

const CODE = cdc`
import NonFungibleToken from 0x631e88ae7f1d7c20
import SportsCastCollectible_NFT from 0x5e639f377602ccc9

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

`

export async function burnBitesPack(tokenId:number) {
  // prettier-ignore
  const user = await (await currentUser().authenticate());
  
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
      authorizations([authz]),
      //@ts-ignore
      args([
        arg([tokenId], t.Array(t.UInt64)),
        arg(
            process.env.NEXT_PUBLIC_SPORTSCAST_CONTRACT_ADDRESS
            , t.String),
      ]),
    ],
    {}
  )
}
