//
// Enable FUSD vault on wallet to accept of FUSD token
// Fungible Token Contract - https://docs.onflow.org/core-contracts/fungible-token/ 
//      Testnet   0x9a0766d93b6608b7     Mainnet   0xf233dcee88fe0abe
// Non-Fungible Token Contract - https://docs.onflow.org/core-contracts/non-fungible-token/
//      Testnet   0x631e88ae7f1d7c20     Mainnet   0x1d7e57aa55817448
// FUSD Transactions & Scripts - https://docs.onflow.org/fusd/transactions/
//      Testnet   0xe223d8a629e49c68     Mainnet   0x3c5959b568896393
 import FungibleToken from 0x9a0766d93b6608b7
 import FUSD from 0xe223d8a629e49c68

transaction {

  prepare(signer: AuthAccount) {

    // It's OK if the account already has a Vault, but we don't want to replace it
    if(signer.borrow<&FUSD.Vault>(from: /storage/fusdVault) != nil) {
      return
    }
    
    // Create a new FUSD Vault and put it in storage
    signer.save(<-FUSD.createEmptyVault(), to: /storage/fusdVault)

    // Create a public capability to the Vault that only exposes
    // the deposit function through the Receiver interface
    signer.link<&FUSD.Vault{FungibleToken.Receiver}>(
      /public/fusdReceiver,
      target: /storage/fusdVault
    )

    // Create a public capability to the Vault that only exposes
    // the balance field through the Balance interface
    signer.link<&FUSD.Vault{FungibleToken.Balance}>(
      /public/fusdBalance,
      target: /storage/fusdVault
    )
  }
}