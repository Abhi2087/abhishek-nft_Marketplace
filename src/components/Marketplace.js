import Navbar from "./Navbar";
import NFTTile from "./NFTTile";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState } from "react";
import { urlToHttpOptions } from "url";
import { base58 } from "ethers/lib/utils";

export default function Marketplace() {
const sampleData = [
    {
        "name": "NFT#1",
        "description": "",
        "website":"",
        "image":"",
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"",
    },
    {
        "name": "NFT#2",
        "description": "",
        "website":"",
        "image":"",
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"",
    },
    {
        "name": "NFT#3",
        "description": "",
        "website":"",
        "image":"",
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"",
    },
];
const [data, updateData] = useState(sampleData);
const [dataFetched, updateFetched] = useState(false);

async function getAllNFTs() {
    
    const ethers = require("ethers");
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    
    let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)
    
    let transaction = await contract.getAllNFTs()

    
    const items = await Promise.all(transaction.map(async i => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.image,
            name: meta.name,
            description: meta.description,
        }
        return item;
    }))

    updateFetched(true);
    updateData(items);
}

if(!dataFetched)
    getAllNFTs();

return (
    <div>
        <Navbar></Navbar>
        <div className="flex flex-col place-items-center mt-20">
            <div className="md:text-xl font-bold text-white">
                Top NFTs
            </div>
            <div className="flex mt-5 justify-between flex-wrap max-w-screen-xl text-center">
                {data.map((value, index) => {
                    return <NFTTile data={value} key={index}></NFTTile>;
                })}
            </div>
        </div>            
    </div>
);

}


