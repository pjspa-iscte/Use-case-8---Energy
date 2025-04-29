import { useEffect } from "react";
import { getContract } from "./hooks/useContract";
import CreateOffer from "./components/CreateOffer";
import OfferList from "./components/OfferList";

function App() {
  useEffect(() => {
    const connect = async () => {
      try {
        if (window.ethereum) {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const contract = await getContract();
          const count = await contract.getOffersCount();
          console.log("Número de ofertas:", count.toString());
        } else {
          console.error("MetaMask não detectada!");
        }
      } catch (error) {
        console.error("Erro ao conectar:", error);
      }
    };

    connect();
  }, []);

  return (
    <div>
      <h1>⚡ P2P Energy DApp</h1>
      <CreateOffer />
      <OfferList />
    </div>
  );
}

export default App;