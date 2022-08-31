// HandyItems.test.js
// test handyItems contract on local flow emulator

const config = require("../config.js");
const fjs = require("flow-js-testing/dist");
const path = require("path");

const mintHandyItem = require('../transactions/handyItems/mint_handy_item.js');
const getHandyItem = require('../scripts/handyItems/get_handy_item.js');
const getColleactionLength = require('../scripts/handyItems/get_collection_length.js');
const getHandyItemsSupply = require('../scripts/handyItems/get_handy_items_supply.js');
const getColleactionIds = require('../scripts/handyItems/get_collection_ids.js');
const trasferHandyItem = require('../transactions/handyItems/transfer_handy_item.js');
const purchaseHandyItem = require('../transactions/handyItems/purchase_handy_item.js');
const createSet = require('../transactions/handyItems/create_set.js');

//init flow-js-testing path
fjs.init(path.resolve(__dirname, "../"));

// mint HandyItems
test('Mint HandyItems to Sample Account 1', async () => {
    const metadata_1 = [
        { key: "name", value: "NFT 1 Qty 5" },
        { key: "description", value: "Description of NFT" },
        { key: "Author", value: "FirstName LastName" },
        { key: "ipfs", value: "uri_string_identifier0124093485823213" },
        { key: "assetType", value: "video" }
    ]
    await mintHandyItem(config["0xAdmin"], "Ben", 5, metadata_1);

    const metadata_2 = [
        { key: "name", value: "NFT 2 Qty 3" },
        { key: "description", value: "Description of NFT" },
        { key: "Author", value: "FirstName LastName" },
        { key: "ipfs", value: "uri_string_identifier0124002982344329" },
        { key: "assetType", value: "image" }
    ]
    await mintHandyItem(config["0xAdmin"], "Sarah", 3, metadata_1);
});

// get HandyItems
test('Get HandyItems from Sample Accounts', async () => {
    const handyItems = await getHandyItem("Ben");
    expect(handyItems.length).toBe(5)
    expect(handyItems[0]["metadata"]["name"]).toBe("NFT 1 Qty 5");
    expect(handyItems[3]["serial"]).toBe(4);
    expect(handyItems[3]["serialCount"]).toBe(5);
});

// get Collection Length
test('Get Collection Length from Sample Accounts', async () => {
    const handyItems = await getColleactionLength("Ben");
    expect(handyItems.length).toBe(5)
    expect(handyItems[0]["metadata"]["name"]).toBe("NFT 1 Qty 5");
    expect(handyItems[3]["serial"]).toBe(4);
    expect(handyItems[3]["serialCount"]).toBe(5);
});

// get HandyItems Supply
test('Get HandyItems Supply from Sample Accounts', async () => {
    const handyItems = await getHandyItemsSupply("Ben");
    expect(handyItems.length).toBe(5)
    expect(handyItems[0]["metadata"]["name"]).toBe("NFT 1 Qty 5");
    expect(handyItems[3]["serial"]).toBe(4);
    expect(handyItems[3]["serialCount"]).toBe(5);
});

// get Collection Ids
test('Get Collection Ids from Sample Accounts', async () => {
    const handyItems = await getColleactionIds("Ben");
    expect(handyItems.length).toBe(5)
    expect(handyItems[0]["metadata"]["name"]).toBe("NFT 1 Qty 5");
    expect(handyItems[3]["serial"]).toBe(4);
    expect(handyItems[3]["serialCount"]).toBe(5);
});

// transfer HandyItems
test('Transfer HandyItems to/from Sample Accounts', async () => {
    await trasferHandyItem("Ben", "Colin", 2);
    const handyItems = await getHandyItem("Colin");
    expect(handyItems.length).toBe(1)
    //id indexing starts at 0, serial indexing starts at 1
    expect(handyItems[0]["serial"]).toBe(3);
});

// purchase HandyItems
test('Purchase HandyItems to Sample Account', async () => {
    const metadata = [
        { key: "name", value: "NFT 1 Qty 5" },
        { key: "description", value: "Description of NFT" },
        { key: "Author", value: "FirstName LastName" },
        { key: "ipfs", value: "uri_string_identifier0124093485823213" },
        { key: "assetType", value: "video" }
    ]
    await purchaseHandyItem(config["0xAdmin"], config["0xAdmin"], 5, metadata);
});

// create set
test('Create Set to Sample Account', async () => {
    const metadata = [
        { key: "name", value: "NFT 1 Qty 5" },
        { key: "description", value: "Description of NFT" },
        { key: "Author", value: "FirstName LastName" },
        { key: "ipfs", value: "uri_string_identifier0124093485823213" },
        { key: "assetType", value: "video" }
    ]
    await createSet(config["0xAdmin"], config["0xAdmin"], 5, metadata);
});

// create series
test('Create Series to Sample Account', async () => {
    const metadata = [
        { key: "name", value: "NFT 1 Qty 5" },
        { key: "description", value: "Description of NFT" },
        { key: "Author", value: "FirstName LastName" },
        { key: "ipfs", value: "uri_string_identifier0124093485823213" },
        { key: "assetType", value: "video" }
    ]
    await createSet(config["0xAdmin"], metadata);
});

// create edition
test('Create Edition to Sample Account', async () => {
    const metadata = [
        { key: "name", value: "NFT 1 Qty 5" },
        { key: "description", value: "Description of NFT" },
        { key: "Author", value: "FirstName LastName" },
        { key: "ipfs", value: "uri_string_identifier0124093485823213" },
        { key: "assetType", value: "video" }
    ]
    await createSet(config["0xAdmin"], metadata);
});