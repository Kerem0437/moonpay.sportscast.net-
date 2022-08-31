import SportsCastCollectible_NFT from "../../contracts/SportscastCollectibles.cdc";

pub fun main(): [SportsCastCollectible_NFT.SeriesData] {
	return SportsCastCollectible_NFT.getAllSeries()
}