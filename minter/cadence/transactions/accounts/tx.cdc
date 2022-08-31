// Fungible Token Contract - https://docs.onflow.org/core-contracts/fungible-token/ 
//      Testnet   0x9a0766d93b6608b7     Mainnet   0xf233dcee88fe0abe
import FungibleToken from 0xf233dcee88fe0abe
transaction(amount: UFix64, to: Address) {
  let vault: @FungibleToken.Vault
  prepare(signer: AuthAccount) {
    self.vault <- signer
    .borrow<&{FungibleToken.Provider}>(from: /storage/flowTokenVault)!
    .withdraw(amount: amount)
  }
  execute {
    getAccount(to)
    .getCapability(/public/flowTokenReceiver)!
    .borrow<&{FungibleToken.Receiver}>()!
    .deposit(from: <-self.vault)
  }
}