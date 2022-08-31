import {transaction, limit, proposer,payer, authorizations, authz, cdc,currentUser} from "@onflow/fcl"
import {invariant} from "@onflow/util-invariant"
import {tx} from "../tx"

const CODE = cdc`
import NonFungibleToken from 0xNonFungibleToken
import HandyItems from 0xHadnyItems

// This script returns an array of all the NFT IDs in an account's collection.

pub fun main(): [UInt64] {
    // get the series 
    let seriesIds = HandyItems.getSeries();
    let seriesObjects = [];
    let editionObjects = [];
    for seriesId in seriesIds {
        
        let series = HandyItems.getSeries(seriesId);
        seriesObjects.push(series);
        // for each series lets get the edition ids
        let editionIds = HandyItems.getEditions(seriesId);
        // for each edition get the detials and return them 
        
        for editionId in editionIds {
            let editionId = editionIds[j];
            let edition = HandyItems.getEdition(editionId);
            editionObjects.push(edition);
        }
    }
    // return them 
    return seriesIds;
}
`

export async function getAllEditionsAndSeries(address:string) {
    // prettier-ignore
    const user = await (await currentUser().authenticate());
    
    invariant(user.addr != null, "Tried to initialize an account but no address was supplied")
  
    return tx(
      [
        transaction(CODE),
        limit(70),
        proposer(authz),
        payer(authz),
        authorizations([authz]),
      ],
      {}
    )
  }