// AWS KMS - Key Management Service 
// For *encrypting* and storing secrets
//
// do NOT run this on the server.. only run it locally to be SECURE
// must be run inside of a project cause it requires kms-client module.
//
// you must replace these values with your own AWS KEY/SECRET to work
// accessKeyId: 'AK****************AK',
// secretAccessKey: 'AK************************************AK'
//
//  Run Locally
// 1. From /api/src/utils/
// > node encrypt.ts
// 2. From the main folder
// > node api/src/utils/encrypt.ts
// 3. To encrypt value from a command line, from the main folder
// > node api/src/utils/encrypt.ts value
// 4. To encrypt value from a command line, from /api/src/utils/
// > node api/src/utils/encrypt.ts value
//@ts-ignore
const path = require("path");
const { KMSClient, EncryptCommand, DecryptCommand } = require("@aws-sdk/client-kms");
const { fromIni } = require("@aws-sdk/credential-provider-ini");
const dotenv = require('dotenv');
const envExpand = require('dotenv-expand')
const env = envExpand(dotenv.config({ 
  path: path.resolve(__dirname, '../../.env.development')
})).parsed

const client = new KMSClient({
  // credentials: fromIni({profile: 'kms_user'}),
  credentials: {
    accessKeyId: 'AK****************AK',
    secretAccessKey: 'AK************************************AK'
  },
  region: "us-west-2"
});
// You will need to change this VARIABLE
// this is your AWS public KMS store location key
// this is the KMS for ikonicc AWS account:: terraform_key_0
const KeyId = 'arn:aws:kms:us-west-2:461953590500:key/5cf5fe14-c4ce-46ee-9a0b-8c2397dd8a01';

let encryptionString;
if (process.argv[2]?.length) {
  //encryptionString = new Buffer.from(process.argv[2]);
} else {
  // This is the line you need to change to encrypt, below env value is being encrypted
  encryptionString = new Uint8Array(env.MINTER_PRIVATE_KEY.split(','));
  // This is a example of value to encrypt a static string
  // encryptionString = new Uint8Array("hello".split(','));
}
//
// This is a example how you can decrpyt to test as well
// const decryptionString = new Uint8Array(env.MINTER_PRIVATE_KEY.split(','))


// const command = new DecryptCommand({CiphertextBlob: decryptionString});
const command = new EncryptCommand({ KeyId, Plaintext: encryptionString });
//@ts-ignore
client.send(command, (err, data) => {
  if (err) {
    console.log(err)
    return;
  }

  // that's an output for encryption command - you should copy this output and place into the config 'as is'
  console.log(data.CiphertextBlob.toString('base64'))
  
  // that's an output for decryption command - should print exactly the same value as was encrypted
  // console.log(String.fromCharCode.apply(null, new Uint16Array(data.Plaintext)))
});