# Bitchanic Platform (Monorepo)

This repository contains a minimal scaffold for a decentralized e-commerce platform for hydroponic produce using a custom ERC-20 token (BCHN).

What’s included:
- `contracts/BitchanicToken.sol` - ERC-20 token with marketplace-oriented methods (purchase, subscribe, loyalty).
- `scripts/deploy.js` - simple deploy script for Hardhat local network.
- `test/BitchanicToken.test.js` - unit tests covering purchase and loyalty flows.
- `hardhat.config.js` - Hardhat config.

Getting started (install and run tests):

1. Install dependencies

```bash
# from the project root
npm install
```

2. Compile contracts

```bash
npm run compile
```

3. Run tests

```bash
npm test
```

Notes:
- The smart contract contains a simplified marketplace model where buyers must `approve` the token contract to spend BCHN on their behalf and then call `purchaseProduce` which uses internal transfers.
- Subscriptions and other advanced features are included as simple on-chain operations, but production systems should separate marketplace logic into its own contract for better separation of concerns.

Next steps:
- Build the React + TypeScript frontend in `/frontend` with Redux Toolkit, ethers.js and Material-UI.
- Add end-to-end scripts, deployment to testnets (Polygon/Arbitrum), and CI.
