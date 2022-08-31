// get_hand_items_supply.js

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
    name: "handyItems/get_handy_items_supply",
    addressMap
  });

  // Create list of arguments
  // You can group items with the same time under single array
  // Last item in the list should always be the type of passed values
  const args = [
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
