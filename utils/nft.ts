import Orders, { OrderStatus } from '../models/order';
import { NFTs } from '../models/NFTS';
export const getPurchasedNFTIDS = async (editionID:number) => {
    // get all the order id that are sold or are "reserved awaiting purchase"
    const orders = await Orders.find({
        $or:[ 
          {
            editionID,
            status: {
                $in: [OrderStatus.PAYMENT_RECEIVED,OrderStatus.NFT_DELIVERED]
            }
          }, {
            editionID,
            expirationDate: {
                $gte: new Date()
            }
          } 
        ]
    });
    return orders.map(order => order.tokenID);
}

export const calcualteNFT_SetDataTokenIDStart = (nft_set_id:number) => {
  let tokenStartId = 0; // first token id
  for(let i=1;i<=nft_set_id;i++){
    tokenStartId += NFTs[i-1].quantity
  }
  return tokenStartId
}

export const getReminaingNFTTokenIDs = async (editionID:number) => {
    const reservedIds = await getPurchasedNFTIDS(editionID);
    const tokenStartId =  calcualteNFT_SetDataTokenIDStart(editionID);
    // create the list of nft ids inbetwwen tokenStartId and tokenStartId + quantity
    const nftIds = [];
    for(let i=tokenStartId;i<tokenStartId+NFTs[editionID].quantity;i++){
        // if the token id is not in the reservedIds list then add it to the list
        if(!reservedIds.find(id => id === i))
          nftIds.push(i)
    }

    return nftIds;


}


export const getRandomBites = async (setId:number,n:number) =>{
  const set = NFTs[setId];
  if(!set)
    throw new Error("Invalid set id");
  

  // build a list of the other sets that this one will distrobutes 
  const nftsInPack = set.nftsInPack?.map((nftId:number) =>NFTs[nftId]);
  console.log({nftsInPack})
  // load all the nfts in the pack that are in a compledted ored or one that hasnt expired
  const orders = await Orders.find({
      $or:[ 
        {
          editionID : { "$in" : [...set.nftsInPack]},
          status: {
              $in: [OrderStatus.PAYMENT_RECEIVED,OrderStatus.NFT_DELIVERED]
          }
        }, {
          editionID : { "$in" : [...set.nftsInPack]},
          expirationDate: {
              $gte: new Date()
          }
        } 
      ]
  }).sort('nftID');
  const takenTokenIds = orders.map((order:any) => order.nftID);
  const tokenId = [];
  for(const nft of nftsInPack!){
    const tokenIDStart = calcualteNFT_SetDataTokenIDStart(nft.id);
    for(let i = tokenIDStart; i < tokenIDStart + nft.quantity; i++){
      if(!takenTokenIds.includes(i)){
        tokenId.push(i);
      }
    }
  }

  // randomzie the list of token ids
  const randomTokenIds = tokenId.sort(() => Math.random() - 0.5);
  return randomTokenIds.slice(0,n);

}