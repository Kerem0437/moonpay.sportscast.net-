//@ts-ignore
import * as t from "@onflow/types";
//@ts-ignore
import * as fcl from "@onflow/fcl";
import { FlowService } from "./flow";
import * as fs from "fs";
import * as path from "path";
import { NFTs } from "../../models/NFTS";
import { Series } from "../../models/NFTS";
import { calcualteNFT_SetDataTokenIDStart } from "../../utils/nft";
import { AlchemyQueryResult } from "../../flow/scripts/getAccountNfts";

const nonFungibleTokenPath = '"../../contracts/NonFungibleToken.cdc"';
const sportsCastsPath = '"../../contracts/SportscastCollectibles.cdc"';

class SportsCastCollectiblesService {
  constructor(
    private readonly flowService: FlowService,
    private readonly nonFungibleTokenAddress: string,
    private readonly sportsCastsAccount: string
  ) { }

  getAllSeries() {
    const script = fs
      .readFileSync(
        path.join(
          __dirname,
          `../../flow/cdc_scripts/getAllSeries.cdc`
        ),
        "utf8"
      )
      .replace(
        nonFungibleTokenPath,
        fcl.withPrefix(this.nonFungibleTokenAddress)
      )
      .replace(sportsCastsPath, fcl.withPrefix(this.sportsCastsAccount));

    return this.flowService.executeScript<number[]>({
      script,
      args: [],
    });
  }

  getAllNFT_DataSets() {
    const script = fs
      .readFileSync(
        path.join(
          __dirname,
          `../../flow/cdc_scripts/getAllNftSets.cdc`
        ),
        "utf8"
      )
      .replace(
        nonFungibleTokenPath,
        fcl.withPrefix(this.nonFungibleTokenAddress)
      )
      .replace(sportsCastsPath, fcl.withPrefix(this.sportsCastsAccount));

    return this.flowService.executeScript<number[]>({
      script,
      args: [],
    });

  }

  setupAccount = async () => {
    const authorization = this.flowService.authorizeMinter();

    const transaction = fs
      .readFileSync(
        path.join(
          __dirname,
          `../cadence/transactions/handyItems/setup_account.cdc`
        ),
        "utf8"
      )
      .replace(
        nonFungibleTokenPath,
        fcl.withPrefix(this.nonFungibleTokenAddress)
      )
      .replace(sportsCastsPath, fcl.withPrefix(this.sportsCastsAccount));

    return this.flowService.sendTx({
      transaction,
      args: [],
      authorizations: [authorization],
      payer: authorization,
      proposer: authorization,
    });
  };

  transfer = async (recipient: string, itemID: number) => {
    const authorization = this.flowService.authorizeMinter();

    const transaction = fs
      .readFileSync(
        path.join(
          __dirname,
          `../cadence/transactions/handyItems/transfer_handy_item.cdc`
        ),
        "utf8"
      )
      .replace(
        nonFungibleTokenPath,
        fcl.withPrefix(this.nonFungibleTokenAddress)
      )
      .replace(sportsCastsPath, fcl.withPrefix(this.sportsCastsAccount));

    return this.flowService.sendTx({
      transaction,
      args: [fcl.arg(recipient, t.Address), fcl.arg(itemID, t.UInt64)],
      authorizations: [authorization],
      payer: authorization,
      proposer: authorization,
    });
  };

  getCollectionIds = async (account: string): Promise<number[]> => {
    const script = fs
      .readFileSync(
        path.join(
          __dirname,
          `../cadence/scripts/handyItems/get_collection_ids.cdc`
        ),
        "utf8"
      )
      .replace(
        nonFungibleTokenPath,
        fcl.withPrefix(this.nonFungibleTokenAddress)
      )
      .replace(sportsCastsPath, fcl.withPrefix(this.sportsCastsAccount));

    return this.flowService.executeScript<number[]>({
      script,
      args: [fcl.arg(account, t.Address)],
    });
  };

  createSeries = async (series_id: number) => {
    const authorization = this.flowService.authorizeMinter();
    const series = Series[series_id];
    if (!series)
      throw new Error(`No series found for id ${series_id}`);

    const transaction = fs
      .readFileSync(
        path.join(
          __dirname,
          `../../flow/cdc_transactions/createNewSeries.cdc`
        ),
        "utf8"
      )
      .replace(
        nonFungibleTokenPath,
        fcl.withPrefix(this.nonFungibleTokenAddress)
      )
      .replace(sportsCastsPath, fcl.withPrefix(this.sportsCastsAccount));

    // for(const key in Object(series.metadata)){
    //   metadata[key.toString()] = series.metadata[key];
    // }
    const metadata = [];
    for (const key of Object.keys(series.metadata)) {
      metadata.push({
        "key": key.toString(),
        "value": series.metadata[key].toString()
      });
    }

    return this.flowService.sendTx({
      transaction,
      args: [fcl.arg(metadata, t.Dictionary({ key: t.String, value: t.String })),],
      authorizations: [authorization],
      payer: authorization,
      proposer: authorization,
    });
  }

  createSet = async (nft_set_id: number) => {
    console.log({ nft_set_id });
    const authorization = this.flowService.authorizeMinter();
    // get the nft 
    const nft = NFTs[nft_set_id];
    if (!nft)
      throw new Error(`No nft found for id ${nft_set_id}`);



    const transaction = fs
      .readFileSync(
        path.join(
          __dirname,
          `../../flow/cdc_transactions/createNFTset.cdc`
        ),
        "utf8"
      )
      .replace(
        nonFungibleTokenPath,
        fcl.withPrefix(this.nonFungibleTokenAddress)
      )
      .replace(sportsCastsPath, fcl.withPrefix(this.sportsCastsAccount));

    const metadata = [];
    for (const key of Object.keys(nft.metadata)) {
      metadata.push({
        "key": key.toString(),
        "value": nft.metadata[key].toString()
      });
    }
    const ipfsMetadataHashes = [];
    for (const key of Object.keys(nft.ipfsMetadataHashes)) {
      ipfsMetadataHashes.push({
        "key": key,
        "value": nft.ipfsMetadataHashes[key].toString()
      });
    }
    await this.flowService.sendTx({
      transaction,
      args: [fcl.arg(Number(nft.series_id), t.UInt32),
      fcl.arg(Number(nft.quantity), t.UInt32),
      fcl.arg(ipfsMetadataHashes,
        t.Dictionary({ key: t.UInt32, value: t.String })
      ),
      fcl.arg(metadata,
        t.Dictionary({ key: t.String, value: t.String })
      )
      ],
      authorizations: [authorization],
      payer: authorization,
      proposer: authorization,
    });



    return this.batchMintSet(nft_set_id);
  }

  batchMintSet = async (nft_set_id: number) => {
    console.log({ nft_set_id });
    const authorization = this.flowService.authorizeMinter();
    // get the nft 
    const nft = NFTs[nft_set_id];
    if (!nft)
      throw new Error(`No nft found for id ${nft_set_id}`);



    const transaction = fs
      .readFileSync(
        path.join(
          __dirname,
          `../../flow/cdc_transactions/batchMint.cdc`
        ),
        "utf8"
      )
      .replace(
        nonFungibleTokenPath,
        fcl.withPrefix(this.nonFungibleTokenAddress)
      )
      .replace(sportsCastsPath, fcl.withPrefix(this.sportsCastsAccount));




    // computer the list of ids that this should take up 
    const tokenId_start = calcualteNFT_SetDataTokenIDStart(nft_set_id);
    const tokenIds = [];
    for (let i = 0; i < nft.quantity; i++) {
      tokenIds.push(tokenId_start + i);
    }

    // now split them up into groups of 100
    const tokenIdGroups = [];
    for (let i = 0; i < tokenIds.length; i += 100) {
      tokenIdGroups.push(tokenIds.slice(i, i + 100));
    }

    // for each token group lets mint it 
    for (const i in tokenIdGroups) {
      const tokenIds = tokenIdGroups[i];
      console.log(`minting group ${i} of ${tokenIdGroups.length}`);
      await this.flowService.sendTx({
        transaction,
        args: [fcl.arg(Number(nft.series_id), t.UInt32),fcl.arg(Number(nft_set_id), t.UInt32),
        fcl.arg(tokenIds,
          t.Array(t.UInt64)
        ),
        ],
        authorizations: [authorization],
        payer: authorization,
        proposer: authorization,
      });
    }




    return true;
  }
  ownsNFT = async (account: string, tokenId: number) => {
    const script = fs
    .readFileSync(
      path.join(
        __dirname,
        `../../../../flow/cdc_scripts/getNftFromAccountCollection.cdc`
      ),
      "utf8"
    )
    .replace(
      nonFungibleTokenPath,
      fcl.withPrefix(this.nonFungibleTokenAddress)
    )
    .replace(sportsCastsPath, fcl.withPrefix(this.sportsCastsAccount));
    const nft = this.flowService.executeScript<AlchemyQueryResult|null>({
      script,
      args: [fcl.arg(tokenId, t.UInt64),fcl.arg(account, t.Address)],
    });
    if(nft == null)
      return false
      
  return true;
  }
  transferNfts = async (to: string, tokenIds: number[]) => {
    console.log({
      to,
      tokenIds
    })
    const authorization = this.flowService.authorizeMinter();

    const transaction = fs
      .readFileSync(
        path.join(
          __dirname,
          `../../../../../../../flow/cdc_transactions/transferNFTs.cdc`
        ),
        "utf8"
      )
      .replace(
        nonFungibleTokenPath,
        fcl.withPrefix(this.nonFungibleTokenAddress)
      )
      .replace(sportsCastsPath, fcl.withPrefix(this.sportsCastsAccount));
    console.log({
      sportsCastsPath,
      account : fcl.withPrefix(this.sportsCastsAccount)
    })
    return this.flowService.sendTx({
      transaction,
      //tokenIds: [UInt64],recipient:Address
      args: [
        fcl.arg(tokenIds,
          t.Array(t.UInt64)
        ),
        fcl.arg(to, t.Address),

      ],
      authorizations: [authorization],
      payer: authorization,
      proposer: authorization,
    });
  }
  transferNftsAsync = async (to: string, tokenIds: number[],onComplete:(tx)=>void,onError:(e:any)=>void) => {
    console.log({
      to,
      tokenIds
    })
    const authorization = this.flowService.authorizeMinter();

    const transaction = fs
      .readFileSync(
        path.join(
          __dirname,
          `../../../../../../../flow/cdc_transactions/transferNFTs.cdc`
        ),
        "utf8"
      )
      .replace(
        nonFungibleTokenPath,
        fcl.withPrefix(this.nonFungibleTokenAddress)
      )
      .replace(sportsCastsPath, fcl.withPrefix(this.sportsCastsAccount));
    console.log({
      sportsCastsPath,
      account : fcl.withPrefix(this.sportsCastsAccount)
    })
    return this.flowService.sendTxAsync({
      transaction,
      //tokenIds: [UInt64],recipient:Address
      args: [
        fcl.arg(tokenIds,
          t.Array(t.UInt64)
        ),
        fcl.arg(to, t.Address),

      ],
      authorizations: [authorization],
      payer: authorization,
      proposer: authorization,
      callback: (tx) => {
        onComplete(tx);
      },
      error: (err) => {
        onError(err);
      }
    });
  }
}

export { SportsCastCollectiblesService };
