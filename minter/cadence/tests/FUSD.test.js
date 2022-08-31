//FUSD.test.js
//test FUSD contract on local flow emulator

const config = require("../config.js");
const fjs = require("flow-js-testing/dist");
const path = require("path");

const mintFUSD = require('../transactions/FUSD/mintFUSD.js');
const getBalance = require('../scripts/FUSD/get_balance.js');

//init flow-js-testing path
fjs.init(path.resolve(__dirname, "../"));

// mint
test('Mint FUSD to Sample Accounts', async () => {
  await mintFUSD(config["0xAdmin"], config["0xAdmin"], "1000.0000");
});

// get balance
test('Get FUSD Balance of Sample Accounts', async () => {
  await expect(getBalance(config["0xAdmin"])).resolves.toBe("1000.00000000");
  await expect(getBalance("Sarah")).resolves.toBe("0.00000000");
});