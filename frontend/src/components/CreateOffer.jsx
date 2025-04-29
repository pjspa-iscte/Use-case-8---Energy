import { useState } from "react";
import { getContract } from "../hooks/useContract";
import { ethers } from "ethers";


function CreateOffer() {
  const [amountKWh, setAmountKWh] = useState("");
  const [priceWei, setPriceWei] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const contract = await getContract();
      const tx = await contract.createOffer(
        Number(amountKWh),
        ethers.parseEther(priceWei) // converter de ETH para Wei
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
    <div>
      <h2>Criar Oferta de Energia</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Quantidade (kWh):
          <input
            type="number"
            value={amountKWh}
            onChange={(e) => setAmountKWh(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Preço (ETH):
          <input
            type="number"
            value={priceWei}
            onChange={(e) => setPriceWei(e.target.value)}
            required
            step="0.0001"
          />
        </label>
        <br />
        <button type="submit">Criar Oferta</button>
      </form>
      <p>{status}</p>
    </div>
  );
}

export default CreateOffer;