

export const getFileUrlFromCID = (cid:string) => {
    return `https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY_SUBDOMAIN}.mypinata.cloud/ipfs/${cid}`;
}