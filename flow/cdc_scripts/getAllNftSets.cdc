import SportsCastCollectible_NFT from "../../contracts/SportscastCollectibles.cdc"
pub fun main(): [SportsCastCollectible_NFT.NFTSetData] {
	return SportsCastCollectible_NFT.getAllSets()
}