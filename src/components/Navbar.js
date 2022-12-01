import logo from '../logo_3.png';
import fullLogo from '../full_logo.png';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { updateLocal } from 'web3modal';

function Navbar() {

const [connected, toggleConnect] = useState(false);
const location = useLocation();
const [currAddress, updateAddress] = useState('0x');


async function getAddress() {
   const ethers = require("ethers");
   const providers = new ethers.providers.Web3Provider(window.ethereum);
   const signer = providers.getsigner();
   const addr = await signer.getAddress();
   updateAddress(addr);
}

function updateButton(){
  const ethereumButton = document.querySelector('.enableEthereumButton');
  ethereumButton.textContent = "connected";
  ethereumButton.classList.remove("hover:bg-blue-70");
  ethereumButton.classList.remove("bg-blue-500");
  ethereumButton.classList.add("hover:bg-blue-70");
  ethereumButton.classList.add("bg-blue-500");

}

async function connectWebsite(){
  const chainId = await window.ethereum.request({method:'eth_chainId'});
  if(chainId !== '0x5')
  {
    await window.ethereum.request({
      method: 'wallet_switchEthereumchain',
      params: [{ chainId: '0x5'}],
    })
  }

  await window.ethereum.request({method: 'eth_requestAccounts'})
  .then(() => {
    updateButton();
    console.log('here');
    getAddress();
    window.location.replace(location.pathname)
  });

}    return (
      <div className="">
        <nav className="w-screen">
          <ul className='flex items-end justify-between py-3 bg-transparent text-white pr-5'>
          <li className='flex items-end ml-5 pb-2'>
            <Link to="/">
            <img src={fullLogo} alt="" width={120} height={120} className="inline-block -mt-2"/>
            <div className='inline-block font-bold text-xl ml-2'>
              NFT Marketplace
            </div>
            </Link>
          </li>
          <li className='w-2/6'>
            <ul className='lg:flex justify-between font-bold mr-10 text-lg'>
              {location.pathname === "/" ? 
              <li className='border-b-2 hover:pb-0 p-2'>
                <Link to="/">Marketplace</Link>
              </li>
              :
              <li className='hover:border-b-2 hover:pb-0 p-2'>
                <Link to="/">Marketplace</Link>
              </li>              
              }
              {location.pathname === "/sellNFT" ? 
              <li className='border-b-2 hover:pb-0 p-2'>
                <Link to="/sellNFT">List My NFT</Link>
              </li>
              :
              <li className='hover:border-b-2 hover:pb-0 p-2'>
                <Link to="/sellNFT">List My NFT</Link>
              </li>              
              }              
              {location.pathname === "/profile" ? 
              <li className='border-b-2 hover:pb-0 p-2'>
                <Link to="/profile">Profile</Link>
              </li>
              :
              <li className='hover:border-b-2 hover:pb-0 p-2'>
                <Link to="/profile">Profile</Link>
              </li>              
              }  
              <li>
                <button className="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"onClick={connectWebsite}>{connected? "Connected":"Connect Wallet"}</button>
              </li>
            </ul>
          </li>
          </ul>
        </nav>
        <div className='text-white text-bold text-right mr-10 text-sm'>
          {currAddress !== "" ? "Connected to":"Not Connected. Please login to view NFTs"} {currAddress !== "" ? (currAddress.substring(0,15)+'...'):""}
        </div>
      </div>
    );
  }

  export default Navbar;