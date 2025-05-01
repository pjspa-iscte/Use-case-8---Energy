import { ethers } from "ethers";
import contractABI from "../abi/EnergyMarketplace.json";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

export async function getContract() {
  if (typeof window.ethereum === "undefined") {
    alert("MetaMask não detetada! Instale e ative a extensão.");
    return null; 
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  console.log(CONTRACT_ADDRESS);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, signer);
  return contract;
}
