import FungibleToken from 0x9a0766d93b6608b7
import FUSD from 	0xe223d8a629e49c68

transaction(recipient: Address, amount: UFix64) {
    let tokenAdmin: &FUSD.Administrator
    let tokenReceiver: &{FungibleToken.Receiver}

    prepare(signer: AuthAccount) {
        self.tokenAdmin = signer
        .borrow<&FUSD.Administrator>(from: FUSD.AdminStoragePath)
        ?? panic("Signer is not the token admin")
        
        self.tokenReceiver = getAccount(recipient)
        .getCapability(/public/fusdReceiver)!
        .borrow<&FUSD.Vault{FungibleToken.Receiver}>()
        ?? panic("Unable to borrow receiver reference")
    }

    execute {
        let minter <- self.tokenAdmin.createNewMinter()

        let mintedVault <- minter.mintTokens(amount: amount)

        self.tokenReceiver.deposit(from: <-mintedVault)

        destroy minter
    }
}