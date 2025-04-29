import { useEffect, useState } from "react";
import { getContract } from "../hooks/useContract";
import { ethers } from "ethers";

function OfferList() {
  const [offers, setOffers] = useState([]);
  const [status, setStatus] = useState("");

  // função movida para fora do useEffect para poder reutilizar
  const fetchOffers = async () => {
    try {
      const contract = await getContract();
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
    }
  };

  // chamada inicial
  useEffect(() => {
    fetchOffers();
  }, []);

  const buyEnergy = async (id, priceWei) => {
    try {
      const contract = await getContract();
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
    <div>
      <h2>Ofertas Disponíveis</h2>
      {offers.length === 0 ? (
        <p>🚫 Nenhuma oferta ativa encontrada.</p>
      ) : (
        <ul>
          {offers.map((offer, index) => (
            <li key={index}>
              <strong>Vendedor:</strong> {offer.seller} <br />
              <strong>Quantidade:</strong> {String(offer.amountKWh)} kWh <br />
              <strong>Preço:</strong>{" "}
              {offer.priceWei ? ethers.formatEther(offer.priceWei) : "0"} ETH <br />
              <button onClick={() => buyEnergy(offer.id, offer.priceWei)}>Comprar</button>
              <hr />
            </li>
          ))}
        </ul>
      )}
      <p>{status}</p>
    </div>
  );
}

export default OfferList;