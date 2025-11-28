# Bitchanic Platform — Decentralized Farm-to-Table Ecommerce

A complete decentralized ecommerce platform for hydroponic produce using a custom ERC-20 token (BCHN). Integrates crypto mining sustainability with farm-to-table delivery, featuring on-chain purchases, subscriptions, loyalty rewards, and live farm transparency metrics.

## 🌱 Features

### Core Marketplace
- **Real-time Product Listings** — Products fetched live from blockchain with stock availability
- **Token-Based Purchases** — Buy produce using BCHN tokens with approve + purchase flow
- **Cart Management** — Redux Toolkit shopping cart with persistent state
- **Checkout Flow** — Gas estimation, transaction monitoring, and confirmation
- **Live Stock Updates** — Product stock decrements on-chain when purchases occur (event-driven)

### User Dashboard
- **Wallet Integration** — MetaMask connect with real BCHN balance display
- **Transaction Monitoring** — Live tx hash status tracking via `waitForTransaction`
- **Order History** — View all past orders (blockchain-backed)
- **Loyalty Points** — Earn points per purchase, tier-based rewards system

### Subscriptions
- **Recurring Deliveries** — Weekly/monthly/quarterly produce box plans
- **Automated Payments** — One-click subscribe with BCHN token approval
- **Recurring Rewards** — Accumulate loyalty points automatically

### Farm Transparency
- **Carbon Footprint Tracking** — CO₂ savings vs traditional farming
- **Energy Metrics** — Live farm energy breakdown (mining waste heat recycling, climate control, irrigation)
- **Growing Pod Status** — Real-time pod health, temperature, humidity monitoring
- **Camera Feed Placeholder** — Integration point for live IP camera streams

### Tokenomics
- **BCHN Token** — ERC-20 token (10M supply, 18 decimals)
- **Transaction Fees** — 2% farm maintenance, 1% liquidity pool contribution
- **Loyalty Rewards** — Users can claim accumulated points for discounts
- **Token Burn** — Owner-only burn mechanism for supply management

## 🏗️ Architecture

```
newvibe/
├── contracts/
│   └── BitchanicToken.sol          # ERC-20 contract with purchase/subscription/loyalty
├── scripts/
│   ├── deploy.js                   # Basic deployment
│   └── deployAndExport.js          # Deploy + export ABI/address to frontend
├── test/
│   └── BitchanicToken.test.js      # Hardhat unit tests (3 passing)
├── frontend/
│   ├── src/
│   │   ├── App.tsx                 # Main routing + AppBar
│   │   ├── index.tsx               # React entry, Redux Provider
│   │   ├── components/
│   │   │   ├── TokenBalance.tsx    # Wallet connect + BCHN balance
│   │   │   ├── ProductCard.tsx     # Product card (add to cart)
│   │   │   ├── CartDrawer.tsx      # Cart drawer UI
│   │   │   └── TxStatus.tsx        # Transaction status monitor
│   │   ├── pages/
│   │   │   ├── Marketplace.tsx     # Product listing + event subscription
│   │   │   ├── Checkout.tsx        # Cart checkout + gas estimation + tx tracking
│   │   │   ├── Subscriptions.tsx   # Subscription plans (subscribe + pay)
│   │   │   ├── Loyalty.tsx         # Loyalty points + claim rewards + tiers
│   │   │   └── Transparency.tsx    # Farm metrics + pod status + energy
│   │   ├── store/
│   │   │   ├── store.ts            # Redux store config
│   │   │   └── cartSlice.ts        # Cart reducer (add/remove/clear)
│   │   ├── contracts/
│   │   │   ├── contract.ts         # Web3 helpers (gas estimation, events, product fetching)
│   │   │   └── BitchanicToken.json # Deployed ABI + address
│   │   └── web3/
│   │       └── hooks.ts            # Provider/signer helpers
│   ├── package.json                # React deps
│   └── tsconfig.json               # TypeScript config
├── hardhat.config.js               # Hardhat config
├── package.json                    # Root deps (Hardhat, ethers, @openzeppelin)
└── README.md                       # This file
```

## 📋 Smart Contract Overview

### BitchanicToken (ERC-20)
- **Name:** Bitchanic Token
- **Symbol:** BCHN
- **Decimals:** 18
- **Total Supply:** 10,000,000 BCHN

#### Key Functions
```solidity
// Purchase produce
function purchaseProduce(uint256 productId, uint256 quantity) external

// Subscribe to delivery plan
function subscribeToDelivery(uint256 planId, uint256 months) external

// Claim loyalty rewards
function claimLoyaltyRewards() external

// Burn tokens (owner)
function burnTokens(uint256 amount) external

// Owner: add/update products
function addNewProduct(string memory name, uint256 price, uint256 initialStock, uint256 harvestDate, string memory metadataURI) external onlyOwner

// View order history
function getUserOrderHistory(address user) external view returns (Order[] memory)

// View loyalty points
function getLoyaltyPoints(address user) external view returns (uint256)
```

#### Events
- `ProducePurchased(address indexed buyer, uint256 productId, uint256 quantity, uint256 totalCost, uint256 orderId)`
- `SubscriptionCreated(address indexed user, uint256 planId, uint256 durationMonths)`
- `LoyaltyRewardClaimed(address indexed user, uint256 points)`

## 🚀 Quick Start

### Prerequisites
- Node.js v20+ and npm
- MetaMask browser extension (for wallet integration)
- Hardhat (installed as dev dep)

### Local Setup

1. **Install root dependencies and smart contract deps:**
   ```bash
   cd /d/newvibe
   npm install --legacy-peer-deps
   npm run compile
   ```

2. **Run smart contract tests:**
   ```bash
   npm test
   ```
   Expected: 3 tests passing (initial supply, product purchase, loyalty rewards)

3. **Deploy contract and export ABI:**
   ```bash
   npm run deploy:export
   ```
   This deploys `BitchanicToken` to a local Hardhat network and writes the ABI + address to `frontend/src/contracts/BitchanicToken.json`.

4. **Install and start the frontend:**
   ```bash
   cd frontend
   npm install --legacy-peer-deps
   npm start
   ```
   The React dev server opens at http://localhost:3000.

### Using the Platform

1. **Connect Wallet:**
   - Click "Connect Wallet" in the header
   - MetaMask will prompt you to connect to the local Hardhat network
   - Approve and your wallet address + BCHN balance will display

2. **Browse & Purchase:**
   - Go to **Marketplace** — see on-chain products with real stock levels
   - Click "Add to cart" on any product
   - Click the **Cart** button to view items and total BCHN cost
   - Click **Checkout** — review, see gas estimate, approve token spending, and pay
   - Watch transaction hashes update live as they confirm on-chain

3. **Subscriptions:**
   - Visit **Subscribe** page — choose a delivery plan
   - Click "Subscribe Now" — approve and pay with BCHN
   - Recurring deliveries start immediately (on-chain record created)

4. **Loyalty Rewards:**
   - Visit **Loyalty** page — see your accumulated points and tier
   - Points earned automatically on every purchase (1 point = 1 BCHN spent)
   - Unlock tiers: Bronze (0 pts), Silver (50 pts), Gold (150 pts), Platinum (300 pts)
   - Click "Claim Rewards" to redeem points for BCHN tokens

5. **Farm Transparency:**
   - Visit **Transparency** page — see live metrics:
     - CO₂ saved year-to-date
     - % energy from mining waste heat
     - Water conservation vs traditional
     - Live growing pod health, temperature, humidity
     - Energy consumption breakdown

## 🔧 Configuration & Environment

### Hardhat Network
- Local in-process Hardhat network (no external node required for testing)
- Default chain ID: 31337
- Accounts: 20 pre-funded test accounts with ETH

### Contract Deployment
- Initial supply (10M BCHN) minted to deployer
- Products added via `addNewProduct` (owner-only)
- Fee parameters: 2% maintenance, 1% liquidity (configurable via `setFees`)

### Frontend Configuration
- **Contract Address & ABI:** Loaded from `frontend/src/contracts/BitchanicToken.json` (auto-generated by `deployAndExport` script)
- **Provider:** Web3Provider (MetaMask or default provider)
- **Signer:** MetaMask-connected signer (user account)

## 📊 Smart Contract Events & Monitoring

The frontend subscribes to smart contract events for live updates:

```typescript
// Subscribe to purchases to update marketplace stock live
subscribeToProducePurchased((buyer, productId, quantity) => {
  // Update product stock in local state
  setProducts(prev => 
    prev.map(p => p.id === productId 
      ? { ...p, stock: p.stock - quantity } 
      : p
    )
  );
});
```

## 🧪 Testing

### Contract Tests
```bash
cd /d/newvibe
npm test
```

Tests cover:
- Initial supply allocation
- Product purchase flow (approve + purchase)
- Loyalty points accumulation and claim

### Frontend Builds
```bash
cd frontend
npm run build
```

Production build optimizes React, TypeScript, and Material-UI for deployment.

## 🐛 Troubleshooting

### "MetaMask not connected" error
- Ensure MetaMask is installed and unlocked
- Click "Connect Wallet" and approve the connection request
- Check MetaMask network is set to "Localhost 8545" (Hardhat default)

### "No products loading"
- Verify `deploy:export` was run (creates `frontend/src/contracts/BitchanicToken.json`)
- Check browser console for errors (ethers.js contract calls)
- Ensure the Hardhat network is running (deploy script uses in-process network)

### Transaction fails with "Insufficient balance"
- User needs enough BCHN tokens; initially only deployer has tokens
- Transfer tokens from deployer to test user account via a simple Hardhat script (not yet included)

### Gas estimation shows "N/A"
- Gas estimation can fail if the transaction would fail; check account balance and allowance
- Real gas costs depend on network (Hardhat: negligible; mainnet/testnet: variable)

## 📚 Tech Stack

- **Blockchain:** Solidity, Hardhat, ethers.js v5
- **Frontend:** React 18, TypeScript, Redux Toolkit, Material-UI v5
- **State Management:** Redux Toolkit + hooks
- **Styling:** Material-UI (MUI) + sx prop
- **Routing:** React Router v6
- **Web3:** ethers.js (provider, signer, contract instance, events)

## 🎯 Future Enhancements

1. **Product Filters** — Filter by category, freshness, growing method
2. **Order History Dashboard** — Show past orders with delivery tracking
3. **Subscription Automation** — Off-chain job scheduler for recurring payments
4. **Multi-chain Support** — Deploy to Polygon, Arbitrum, Optimism
5. **Advanced Loyalty** — Referral bonuses, seasonal promotions
6. **Real Farm Data** — Integrate IoT sensors for live pod metrics
7. **Community Features** — User profiles, reviews, social sharing
8. **Analytics** — Farm performance metrics, user engagement tracking

## 📝 License

MIT

## 🤝 Contributing

This is a demo/scaffold. Feel free to fork and extend!

## 💬 Support

For issues or questions, check the GitHub repo or create an issue.

---

**Made with ❤️ for sustainable crypto-powered farming.** 🌾🔗
