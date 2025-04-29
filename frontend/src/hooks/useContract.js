import { ethers } from "ethers";
import contractABI from "../abi/EnergyMarketplace.json";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

export async function getContract() {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner(); // precisa do await aqui
  const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, signer);
  return contract;
}