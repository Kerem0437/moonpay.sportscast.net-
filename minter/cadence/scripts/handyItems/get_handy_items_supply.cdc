import HandyItems from "../../contracts/HandyItems.cdc"

// This scripts returns the number of HandyItems currently in existence.

pub fun main(): UInt64 {    
    return HandyItems.totalSupply
}
