import { useEffect, useState } from "react";
import { getContract } from "../hooks/useContract";
import { ethers } from "ethers";
import "./OfferList.css";

function OfferList() {
  const [offers, setOffers] = useState([]);
  const [status, setStatus] = useState("");

  // função movida para fora do useEffect para poder reutilizar
  const fetchOffers = async () => {
    try {
      const contract = await getContract();
      if (!contract) {
        setStatus("❌ MetaMask não detetada ou não autorizada.");
        return;
      }

      const total = await contract.getOffersCount();
      const offersArray = [];

      for (let i = 0; i < total; i++) {
        const offerRaw = await contract.offers(i);
        if (offerRaw[3]) {
          offersArray.push({
            id: i,
            seller: offerRaw[0],
            amountKWh: offerRaw[1],
            priceWei: offerRaw[2],
            active: offerRaw[3],
          });
        }
      }

      setOffers(offersArray);
    } catch (error) {
      console.error("Erro ao buscar ofertas:", error);
      setStatus("❌ Erro ao buscar ofertas.");
    }
  };

  // chamada inicial
  useEffect(() => {
    fetchOffers();
  }, []);

  const buyEnergy = async (id, priceWei) => {
    try {
      const contract = await getContract();
      if (!contract) {
        setStatus("❌ MetaMask não detetada ou não autorizada.");
        return;
      }

      const tx = await contract.buyEnergy(id, { value: priceWei });
      setStatus("⏳ Aguardando confirmação da transação...");
      await tx.wait();
      setStatus("✅ Energia comprada com sucesso!");
      await fetchOffers(); // atualizar lista após a compra
    } catch (error) {
      console.error("Erro na compra:", error);
      setStatus("❌ Falha ao comprar energia.");
    }
  };

  return (
    <div className="offers-container">
      <h2 className="offers-title">Ofertas Disponíveis</h2>
      {offers.length === 0 ? (
        <p className="no-offers">🚫 Nenhuma oferta ativa encontrada.</p>
      ) : (
        <ul className="offers-list">
          {offers.map((offer, index) => (
            <li key={index} className="offer-item">
              <p><strong>Vendedor:</strong> {offer.seller}</p>
              <p><strong>Quantidade:</strong> {String(offer.amountKWh)} kWh</p>
              <p><strong>Preço:</strong> {ethers.formatEther(offer.priceWei)} ETH</p>
              <button className="buy-button" onClick={() => buyEnergy(offer.id, offer.priceWei)}>
                Comprar
              </button>
            </li>
          ))}
        </ul>
      )}
      <p className="status-message">{status}</p>
    </div>
  );
}

export default OfferList;
