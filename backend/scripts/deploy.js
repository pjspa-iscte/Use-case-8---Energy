const hre = require("hardhat");

async function main() {
  const EnergyMarketplace = await hre.ethers.getContractFactory("EnergyMarketplace");
  const energyMarketplace = await EnergyMarketplace.deploy();
  await energyMarketplace.waitForDeployment(); 

  console.log("EnergyMarketplace deployed to:", await energyMarketplace.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });