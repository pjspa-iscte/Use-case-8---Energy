# ⚡ P2P Energy Marketplace – Blockchain DApp

Esta DApp permite a negociação peer-to-peer de energia renovável usando smart contracts Ethereum (Sepolia), React e ethers.js.

---

## 🧩 Tecnologias utilizadas

- Solidity + Hardhat
- Ethereum Sepolia Testnet
- React + Vite
- ethers.js
- MetaMask
- Alchemy

---

## 🚀 Como rodar localmente

### 1. Clonar repositório

```bash
git clone https://github.com/SEU_USUARIO/p2p-energy.git
cd p2p-energy

### 2. Backend (opcional – apenas para referência técnica)

cd backend
npm install
cp .env.example .env
# Edite .env com sua chave privada e Alchemy URL
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia

### 3. Frontend

cd ../frontend
npm install
cp .env.example .env
# Edite com o endereço do contrato em Sepolia
npm run dev

