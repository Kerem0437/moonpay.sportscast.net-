//get_hand_item.js
//args:
//  name, String alias name of account e.g. "Ben", or account address e.g. config["0xAdmin"] or Oxf8d6e0586b0a20c7
//outputs:
//  array of handyItems for the account
    // json 
        // uuid, global flow universe unique identifier
        // id, local flow universe unique identifier
        // handyItem id, Unique Identifier for handyItem
        // serial, Serial Number of handyItem
        // metadata
            // json
                // name, handyItem name
                // key1, sample key/value pair
                // key2, sample key/value pair
                // ipfs, file name for ipfs link
  // example:
  // get the metadata name of the third handyItem in a account's collection
  // returnVal[2]["metadata"]["name"]

const config = require("../../config.js")
const fjs = require("flow-js-testing/dist");
const t = require("@onflow/types");
const path = require("path");

// init
fjs.init(path.resolve(__dirname, "../../"));

async function main(name) {
  // get account
  let accountName = {};
  if (name == config["0xAdmin"]) {
    accountName = name
  } else {
    accountName = await fjs.getAccountAddress(name);
  }
  
  // Read or create script code
  const addressMap = {NonFungibleToken: config["0xAdmin"], HandyItems: config["0xAdmin"]}
  const scriptTemplate = await fjs.getScriptCode({
    name: "handyItems/get_handy_item",
    addressMap
  });

  // Create list of arguments
  // You can group items with the same time under single array
  // Last item in the list should always be the type of passed values
  const args = [
    [accountName, t.Address],
  ];

  try {
    const result = await fjs.executeScript({ code: scriptTemplate, args });
    console.log(name, result)
    return result
  } catch (e) {
    console.log(e);
    return e
  }
};
module.exports = main;