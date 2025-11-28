# Bitchanic Platform — Decentralized Farm-to-Table Ecommerce

A full-stack decentralized ecommerce platform for hydroponic produce with blockchain-backed purchases, subscriptions, loyalty rewards, and farm transparency metrics.

## 🚀 Quick Start

```bash
# 1. Install and test contracts
npm install --legacy-peer-deps
npm test

# 2. Deploy contract and export ABI
npm run deploy:export

# 3. Start the React frontend
cd frontend
npm install --legacy-peer-deps
npm start
```

Open http://localhost:3000 in your browser. Connect your MetaMask wallet and start shopping!

## 📖 Full Documentation

See [ARCHITECTURE.md](./ARCHITECTURE.md) for:
- Complete feature overview
- Smart contract reference
- Local development setup
- Testing & deployment instructions
- Troubleshooting guide
- Tech stack details
- Future enhancements

## ✨ Key Features

✅ **Real-time Marketplace** — On-chain product listings with live stock updates
✅ **Token Purchases** — Buy produce with BCHN tokens, gas estimation, tx monitoring
✅ **Shopping Cart** — Redux state management + persistent cart
✅ **Subscriptions** — Weekly/monthly/quarterly delivery plans
✅ **Loyalty Program** — Earn points, unlock tier-based rewards
✅ **Farm Transparency** — Carbon savings, energy metrics, pod status, camera feeds
✅ **MetaMask Integration** — Secure wallet connect & real BCHN balance
✅ **Event Monitoring** — Live product stock updates on purchase events

## 🏗️ Project Structure

```
├── contracts/                      # Solidity smart contracts
│   └── BitchanicToken.sol          # ERC-20 with purchase/loyalty/subscription
├── scripts/                        # Hardhat deployment scripts
├── test/                           # Unit tests
├── frontend/                       # React + TypeScript UI
│   ├── src/pages/                  # Marketplace, Checkout, Subscriptions, Loyalty, Transparency
│   ├── src/components/             # ProductCard, CartDrawer, TokenBalance, TxStatus
│   ├── src/store/                  # Redux store + cart reducer
│   └── src/contracts/              # Web3 helpers + ABI
└── README.md                       # This file
```

## 🔗 Smart Contract

**BitchanicToken (ERC-20)**
- 10M BCHN supply, 18 decimals
- Purchase produce, subscribe to deliveries, claim loyalty rewards
- 2% maintenance + 1% liquidity fees
- Owner-only product and fee management

See [ARCHITECTURE.md](./ARCHITECTURE.md#smart-contract-overview) for function reference.

## 💡 Quick Usage

1. **Connect Wallet** → See BCHN balance
2. **Browse Marketplace** → Live products from blockchain
3. **Add to Cart** → Redux-managed shopping cart
4. **Checkout** → Approve + purchase (gas estimated)
5. **View Orders** → Check past purchases & loyalty points
6. **Claim Rewards** → Redeem points for BCHN discounts
7. **Explore Transparency** → See farm metrics & energy savings

## 🧪 Testing

```bash
# Contract tests
npm test

# Frontend build
cd frontend && npm run build
```

## 📚 Tech Stack

- **Smart Contracts:** Solidity, Hardhat, ethers.js v5
- **Frontend:** React 18, TypeScript, Redux Toolkit, Material-UI
- **Web3:** MetaMask integration, event monitoring, gas estimation

## 📝 License

MIT
