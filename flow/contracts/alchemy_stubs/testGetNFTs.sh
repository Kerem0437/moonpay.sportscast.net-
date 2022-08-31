SportsCastCollectible_NFT)
  echo "SportsCastCollectible_NFT"
  flow scripts execute getNFTs.cdc --args-json '[{ "type": "Address", "value": "0x61c73078c27d29a8" }, { "type": "Dictionary", "value": [{ "key": { "type": "String", "value": "SportsCastCollectible_NFT" }, "value": { "type": "Array", "value": [{ "type": "UInt64", "value": "14282" }] } }] }]' --network mainnet
  ;;