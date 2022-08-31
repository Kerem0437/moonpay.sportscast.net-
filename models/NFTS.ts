export const Series = [
    {
        id: 0,
        metadata: {
            name : "The Zeb Noland Story",
            description : "Zeb Noland White - SportsCast NFT Collectibles",
            image : "Qmbx1VALv4zTWWyfoRdo1DKrQa14B3DcScBizWx8oLLdAz",
        }

    },
    {
        id: 1,
        metadata: {
            name : "SportsCast Bites Packs",
            description : "Zeb Noland White - SportsCast NFT Collectibles",
            image : "Qmbx1VALv4zTWWyfoRdo1DKrQa14B3DcScBizWx8oLLdAz",
        }

    }
    ,
    {
        id: 2,
        metadata: {
            name : "SportsCast Gold",
            description : "Zeb Noland White - SportsCast NFT Collectibles",
            image : "Qmbx1VALv4zTWWyfoRdo1DKrQa14B3DcScBizWx8oLLdAz",
        }

    }

]

export interface NFT_SetData{
    series_id:number,
    id:number,
    metadata: {
        name : string,
        description : string,
        image : string, // this could be differnt things for the futrure 
        image_file_type : string, // this could be diff things for the future 
        preview: string, // this is always mine type image
        bitesPerPack? : number,
    },
    ipfsMetadataHashes:[string],
    priceInUsd:number,
    quantity:number, // packs dont need it 
    forSales:boolean,
    isRandomPackOfNfts:boolean,
    nftsInPack?:number[],
    ownerOnlyData?:{
        videoUrl:string,
        videoThumbnail:string
    }
    
}

export const ZEBS:NFT_SetData[] = [
    {
        series_id : 0,
        id : 0,
      
        ipfsMetadataHashes : [
            "Qmbx1VALv4zTWWyfoRdo1DKrQa14B3DcScBizWx8oLLdAz",
        ],
        metadata : {
            name : "Zeb Noland White",
            description : "In SportsCast - Zeb Noland White Edition Part 1, quarterback Zeb Noland dives into his childhood passion for football and explains how he drew inspiration from his coach and father, Travis Noland, to become a better player. Check out some of Noland's most insightful pieces of wisdom learned throughout his career.",
            image : "Qmbx1VALv4zTWWyfoRdo1DKrQa14B3DcScBizWx8oLLdAz",
            image_file_type : "image/jpeg",
            preview : "Qmbx1VALv4zTWWyfoRdo1DKrQa14B3DcScBizWx8oLLdAz",
        },
        forSales : true,
        isRandomPackOfNfts : false,
        priceInUsd :  50.0,
        quantity : 5000,
        ownerOnlyData : {
            "videoUrl" : "https://s3.us-west-2.amazonaws.com/nft.ikonicc.ca/ZebNoland_Part1_White_Edition.mp4",
            "videoThumbnail" : "Qmbx1VALv4zTWWyfoRdo1DKrQa14B3DcScBizWx8oLLdAz",
        }
        
    }, 
    {
        series_id : 0,
        id : 1,
      
        ipfsMetadataHashes : [
            "QmQNhxjUhrs5GF31JeseRhrePQxZAduUHdvvVM7XAFLNb6",
        ],
        metadata : {
            name : "Pink Edition",
            description : "Check out Zeb Noland's college football journey and some of the relationships he made along the way, like his friendship with quarterback Trey Lance. SportsCast – Zeb Noland Pink Edition Part 2 dives deep into some hard-hitting moments in his game so far and explores where he sees his career moving in the future.",
            image : "QmQNhxjUhrs5GF31JeseRhrePQxZAduUHdvvVM7XAFLNb6",
            image_file_type : "image/jpeg",
            preview : "QmQNhxjUhrs5GF31JeseRhrePQxZAduUHdvvVM7XAFLNb6",
        },
        forSales : true,
        isRandomPackOfNfts : false,
        priceInUsd : 100,
        quantity : 2500,
        ownerOnlyData : {
            "videoThumbnail" : "QmQNhxjUhrs5GF31JeseRhrePQxZAduUHdvvVM7XAFLNb6",
            "videoUrl" : "https://s3.us-west-2.amazonaws.com/nft.ikonicc.ca/ZebNoland_Part2_Pink_Edition.mp4",
        }
        
    }, 
    {
        series_id : 0,
        id : 2,
      
        ipfsMetadataHashes : [
            "Qmbx1VALv4zTWWyfoRdo1DKrQa14B3DcScBizWx8oLLdAz",
        ],
        metadata : {
            name :  "Orange Edition",
            description : "Zeb Noland discusses the sports industry's turmoil during COVID-19 and how he progressed as a team captain off the field. Check out some of his brightest moments of mentorship in SportsCast – Zeb Noland Orange Edition Part 3.",
            image : "Qmbx1VALv4zTWWyfoRdo1DKrQa14B3DcScBizWx8oLLdAz",
            image_file_type : "image/jpeg",
            preview : "Qmbx1VALv4zTWWyfoRdo1DKrQa14B3DcScBizWx8oLLdAz",
        },
        forSales : true,
        isRandomPackOfNfts : false,
        priceInUsd :  250.0,
        quantity : 1000,
        ownerOnlyData : {
            "videoUrl" :"https://s3.us-west-2.amazonaws.com/nft.ikonicc.ca/ZebNoland_Part3_Orange_Edition.mp4",
            "videoThumbnail" : "Qmbx1VALv4zTWWyfoRdo1DKrQa14B3DcScBizWx8oLLdAz",
        }
        
    }, 
    {
        series_id : 0,
        id : 3,
      
        ipfsMetadataHashes : [
            "QmQNhxjUhrs5GF31JeseRhrePQxZAduUHdvvVM7XAFLNb6",
        ],
        metadata : {
            name : "Prizm Edition",
            description :"Join quarterback Zeb Noland as he reflects on some of his highest (and lowest) moments in the game, sources of inspiration, future career plans, and more in SportsCast – Zeb Noland Prism Edition Part 4.",
            image : "QmQNhxjUhrs5GF31JeseRhrePQxZAduUHdvvVM7XAFLNb6",
            image_file_type : "image/jpeg",
            preview : "QmQNhxjUhrs5GF31JeseRhrePQxZAduUHdvvVM7XAFLNb6",
        },
        forSales : true,
        isRandomPackOfNfts : false,
        priceInUsd :  500.0,
        quantity : 500,
        ownerOnlyData : {
            "videoUrl" : "https://s3.us-west-2.amazonaws.com/nft.ikonicc.ca/ZebNoland_Part4_Prism_Edition.mp4",
            "videoThumbnail" : "Qmbx1VALv4zTWWyfoRdo1DKrQa14B3DcScBizWx8oLLdAz",
        }
        
    }, 
    {
        series_id : 0,
        id : 4,
      
        ipfsMetadataHashes : [
            "Qmbx1VALv4zTWWyfoRdo1DKrQa14B3DcScBizWx8oLLdAz",
        ],
        metadata : {
            name : "Gold Edition",
            description : "In this full-length episode, QB Zeb Noland dives deep into his career and most significant sources of inspiration. He discusses his entire story – from the lessons he learned from his talented father, Travis Noland, to their shared passion for football, his growth as an athlete and mentor, and some of his best moments in the game – in SportsCast – Zeb Noland Gold Edition.",
            image : "Qmbx1VALv4zTWWyfoRdo1DKrQa14B3DcScBizWx8oLLdAz",
            image_file_type : "image/jpeg",
            preview : "Qmbx1VALv4zTWWyfoRdo1DKrQa14B3DcScBizWx8oLLdAz",
        },
        forSales : true,
        isRandomPackOfNfts : false,
        priceInUsd :  1000.0,
        quantity : 250,
        ownerOnlyData : {
            "videoUrl" : "https://s3.us-west-2.amazonaws.com/nft.ikonicc.ca/ZebNoland_Partx_Gold_Edition.mp4",
            "videoThumbnail" : "Qmbx1VALv4zTWWyfoRdo1DKrQa14B3DcScBizWx8oLLdAz",
        }
    }
];




export const BitesPacks:NFT_SetData[] = [
{
    series_id : 1,
    id : 5,
  
    ipfsMetadataHashes : [
        "Qmbx1VALv4zTWWyfoRdo1DKrQa14B3DcScBizWx8oLLdAz",
    ],
    metadata : {
        name : "SportsCast Bite Pack 2",
        description : "Open a pack of 2 and collect them all!",
        image : "Qmbx1VALv4zTWWyfoRdo1DKrQa14B3DcScBizWx8oLLdAz",
        image_file_type : "image/jpeg",
        preview : "Qmbx1VALv4zTWWyfoRdo1DKrQa14B3DcScBizWx8oLLdAz",
        bitesPerPack : 2
    },
    forSales : true,
    isRandomPackOfNfts : true,
    priceInUsd :  1000.0,
    quantity : 250,
    nftsInPack : [
        1,2,3,4
    ],

},
{
    series_id : 1,
    id : 6,
    ipfsMetadataHashes : [
        "Qmbx1VALv4zTWWyfoRdo1DKrQa14B3DcScBizWx8oLLdAz",
    ],
    metadata : {
        name : "SportsCast Bite Pack XL 4 Pack",
        description : "Open a pack of 4 and collect them all!",
        image : "Qmbx1VALv4zTWWyfoRdo1DKrQa14B3DcScBizWx8oLLdAz",
        image_file_type : "image/jpeg",
        preview : "Qmbx1VALv4zTWWyfoRdo1DKrQa14B3DcScBizWx8oLLdAz",
        bitesPerPack : 2
    },
    forSales : true,
    isRandomPackOfNfts : true,
    priceInUsd :  1000.0,
    quantity : 250,
    nftsInPack : [
        1,2,3,4
    ],

}
];
export const HIGH_VALUE:NFT_SetData[] = [
    // the 100 k nft 
    {
        series_id : 2,
        id : 5,
      
        ipfsMetadataHashes : [
            "Qmbx1VALv4zTWWyfoRdo1DKrQa14B3DcScBizWx8oLLdAz",
        ],
        metadata : {
            name : "SportsCast Gold",
            description : "In this full-length episode, QB Zeb Noland dives deep into his career and most significant sources of inspiration. He discusses his entire story – from the lessons he learned from his talented father, Travis Noland, to their shared passion for football, his growth as an athlete and mentor, and some of his best moments in the game – in SportsCast – Zeb Noland Gold Edition.",
            image : "Qmbx1VALv4zTWWyfoRdo1DKrQa14B3DcScBizWx8oLLdAz",
            image_file_type : "image/jpeg",
            preview : "Qmbx1VALv4zTWWyfoRdo1DKrQa14B3DcScBizWx8oLLdAz",
        },
        forSales : true,
        isRandomPackOfNfts : false,
        priceInUsd :  15.00, // 100k
        quantity : 10,
        
    }
];

export const Bites = [
{

},
{

},
{

},
{

},
{

},
{

},
{

},
{

},
{

},

];

export const NFTs:NFT_SetData[] = [
    ...ZEBS,
    ...BitesPacks,
    ...HIGH_VALUE

]