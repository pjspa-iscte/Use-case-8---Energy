import { useState } from "react";
import { getContract } from "../hooks/useContract";
import { ethers } from "ethers";
import "./CreateOffer.css"; 

function CreateOffer() {
  const [amountKWh, setAmountKWh] = useState("");
  const [priceWei, setPriceWei] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const contract = await getContract();
      if (!contract) {
        setStatus("❌ MetaMask não detetada ou não autorizada.");
        return;
      }
  
      const tx = await contract.createOffer(
        Number(amountKWh),
        ethers.parseEther(priceWei)
      );
  
      setStatus("⏳ Aguardando confirmação da transação...");
      await tx.wait();
      setStatus("✅ Oferta criada com sucesso!");
    } catch (error) {
      console.error(error);
      setStatus("❌ Erro ao criar a oferta.");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Criar Oferta de Energia</h2>
      <form onSubmit={handleSubmit} className="offer-form">
        <div className="form-group">
          <label htmlFor="kwh">Quantidade (kWh):</label>
          <input
            id="kwh"
            type="number"
            value={amountKWh}
            onChange={(e) => setAmountKWh(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="eth">Preço (ETH):</label>
          <input
            id="eth"
            type="number"
            value={priceWei}
            onChange={(e) => setPriceWei(e.target.value)}
            required
            step="0.0001"
          />
        </div>

        <button type="submit" className="submit-button">
          Criar Oferta
        </button>
      </form>
      <p className="status-message">{status}</p>
    </div>
  );
}

export default CreateOffer;