const fs = require('fs');
const path = require('path');
const hre = require('hardhat');

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log('Deploying contracts with account:', deployer.address);

  const Token = await hre.ethers.getContractFactory('BitchanicToken');
  const token = await Token.deploy();
  await token.deployed();
  console.log('BitchanicToken deployed to:', token.address);

  const artifact = await hre.artifacts.readArtifact('BitchanicToken');

  const outDir = path.join(__dirname, '..', 'frontend', 'src', 'contracts');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const outPath = path.join(outDir, 'BitchanicToken.json');
  fs.writeFileSync(outPath, JSON.stringify({
    address: token.address,
    abi: artifact.abi
  }, null, 2));

  console.log('Wrote contract ABI and address to', outPath);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
