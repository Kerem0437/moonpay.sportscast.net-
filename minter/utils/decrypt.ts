// AWS KMS - Key Management Service 
// For decrypting stored secrets
 
import { KMSClient, DecryptCommand } from "@aws-sdk/client-kms";
import { fromIni } from "@aws-sdk/credential-provider-ini";

const KeyId = 'arn:aws:kms:us-west-2:461953590500:key/5cf5fe14-c4ce-46ee-9a0b-8c2397dd8a01';
const client = new KMSClient({
  credentials: fromIni({profile: 'kms_user'}),
  region: "us-west-2"
});

const decrypt = async (encryptedValue) => {
  const decryptionString = new Uint8Array(encryptedValue.split(','));
  const command = new DecryptCommand({CiphertextBlob: decryptionString});
  try {
    const result = await client.send(command);
    return String.fromCharCode.apply(null, new Uint16Array(result.Plaintext))
  } catch (err) {
    console.log("ERROR: couldn't decrypt .env value");
  }
};

export default decrypt;
