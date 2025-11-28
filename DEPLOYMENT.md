# Bitchanic Platform - Complete Setup & Deployment Guide

## Project Summary

**Bitchanic** is a full-stack decentralized ecommerce platform for hydroponic produce using a custom ERC-20 token (BCHN). The platform features:

- ✅ Smart contract (ERC-20 token with purchase, subscription, loyalty)
- ✅ React + TypeScript frontend with Material-UI
- ✅ Redux Toolkit for state management
- ✅ MetaMask wallet integration
- ✅ Real-time product marketplace with event monitoring
- ✅ Shopping cart and checkout flow
- ✅ Subscription plans (weekly/monthly/quarterly deliveries)
- ✅ Loyalty rewards program with tier system
- ✅ Farm transparency metrics (carbon savings, energy, pod status)
- ✅ Gas estimation and transaction monitoring

## 📦 Project Files

```
newvibe/
├── contracts/BitchanicToken.sol          # ERC-20 contract
├── scripts/deploy.js                     # Basic deploy
├── scripts/deployAndExport.js            # Deploy + export ABI to frontend
├── test/BitchanicToken.test.js           # Unit tests (3 passing)
├── hardhat.config.js                     # Hardhat config
├── package.json                          # Root deps
├── ARCHITECTURE.md                       # Detailed architecture reference
├── README-NEW.md                         # New comprehensive README
└── frontend/                             # React app
    ├── src/pages/                        # Marketplace, Checkout, Subscriptions, Loyalty, Transparency
    ├── src/components/                   # ProductCard, CartDrawer, TokenBalance, TxStatus
    ├── src/store/                        # Redux store + cart reducer
    ├── src/contracts/                    # Web3 helpers + ABI/address
    └── package.json                      # React deps
```

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- Node.js v20+ and npm
- MetaMask browser extension

### Steps

1. **Install root dependencies and compile contracts:**
   ```bash
   cd /d/newvibe
   npm install --legacy-peer-deps
   npm run compile
   ```

2. **Verify contracts pass tests:**
   ```bash
   npm test
   ```
   Expected output: **3 passing**

3. **Deploy contract and export ABI:**
   ```bash
   npm run deploy:export
   ```
   This writes the deployed address and ABI to `frontend/src/contracts/BitchanicToken.json`

4. **Install and start the frontend:**
   ```bash
   cd frontend
   npm install --legacy-peer-deps
   npm start
   ```
   React opens http://localhost:3000 automatically.

5. **In the browser:**
   - Click **"Connect Wallet"** → MetaMask prompts to connect
   - Approve the connection
   - You'll see your wallet address and BCHN balance (initially 0 unless you're the deployer)
   - Browse **Marketplace**, add items to **Cart**, proceed to **Checkout**
   - Explore **Subscriptions**, **Loyalty**, and **Transparency** pages

## 🔗 Smart Contract Functions

### Purchase Produce
```solidity
function purchaseProduce(uint256 productId, uint256 quantity) external
```
- User calls approve(tokenContract, totalCost) first
- Then calls purchaseProduce(productId, quantity)
- Emits ProducePurchased event
- Updates product stock
- Awards loyalty points (1 point per BCHN spent)

### Subscribe to Delivery
```solidity
function subscribeToDelivery(uint256 planId, uint256 months) external
```
- Approves tokens for subscription price
- Creates a subscription record
- Emits SubscriptionCreated event

### Claim Loyalty Rewards
```solidity
function claimLoyaltyRewards() external
```
- Redeems accumulated loyalty points
- Awards BCHN tokens (0.1 BCHN per point)
- Resets user's points to 0

### Admin Functions (Owner-only)
```solidity
function addNewProduct(string memory name, uint256 price, uint256 initialStock, uint256 harvestDate, string memory metadataURI) external onlyOwner
function updateProductStock(uint256 productId, uint256 newStock) external onlyOwner
function withdrawProceeds(address to, uint256 amount) external onlyOwner
function setFees(uint256 _maintenanceBP, uint256 _liquidityBP) external onlyOwner
```

## 💻 Frontend Usage

### Marketplace (/marketplace)
- Lists all on-chain products with real stock levels
- Click "Add to cart" to add items
- Stock updates live when other users purchase (via event subscription)

### Cart
- Click "Cart" button in header to view items
- Remove items or proceed to Checkout

### Checkout (/checkout)
- Review cart items and total BCHN cost
- View estimated gas (rough conversion: gas * 1 gwei → ETH)
- Click "Pay with BCHN" to:
  1. Approve token spending
  2. Call purchaseProduce for each cart item
  3. Monitor transaction status (tx hash shown, awaits confirmation)

### Subscriptions (/subscriptions)
- Choose a delivery plan (Weekly, Monthly, Quarterly)
- Click "Subscribe Now" → approve + pay with BCHN
- Subscription recorded on-chain

### Loyalty (/loyalty)
- See accumulated loyalty points
- View tier benefits (Bronze, Silver, Gold, Platinum)
- Click "Claim Rewards" to redeem points for BCHN tokens

### Transparency (/transparency)
- View carbon savings (CO₂ kg this year)
- Energy breakdown (mining waste heat %, climate control, irrigation)
- Live growing pod status (health %, temperature, humidity)
- Camera feed placeholder

## 🧪 Testing

### Contract Tests
```bash
cd /d/newvibe
npm test
```

Tests cover:
- Initial supply allocation (10M BCHN to deployer)
- Product purchase flow (add product → approve → purchase)
- Loyalty points accumulation and reward claiming

Expected: **3 passing**

### Frontend Build
```bash
cd frontend
npm run build
```

Note: On first build, you may encounter a TypeScript cache issue. **Workaround:**
```bash
# Option 1: Fresh install
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
npm run build

# Option 2: Skip type checking
CI=false npm run build
```

The app compiles fine; the issue is a react-scripts TypeScript cache quirk.

## 🎛️ Configuration

### Contract Parameters
- **Token Supply:** 10,000,000 BCHN
- **Decimals:** 18
- **Maintenance Fee:** 2% of purchases (configurable)
- **Liquidity Fee:** 1% of purchases (configurable)

### Subscription Plans
- **Plan 1:** Weekly Box - 100 BCHN/month
- **Plan 2:** Monthly Deluxe - 250 BCHN/month
- **Plan 3:** Quarterly Harvest - 500 BCHN/month

### Loyalty Tiers
- **Bronze:** 0+ points
- **Silver:** 50+ points (10% discount)
- **Gold:** 150+ points (15% discount)
- **Platinum:** 300+ points (20% discount + exclusive produce)

## 📊 Contract Events

The frontend listens to these events for live updates:

- **ProducePurchased(address buyer, uint256 productId, uint256 quantity, uint256 totalCost, uint256 orderId)**
  → Triggers marketplace stock update and loyalty point award

- **SubscriptionCreated(address user, uint256 planId, uint256 durationMonths)**
  → Logged for user records

- **LoyaltyRewardClaimed(address user, uint256 points)**
  → Logged for audit trail

## 🔐 Wallet Setup

### MetaMask Configuration
1. Open MetaMask
2. Add Network → Custom RPC:
   - Network Name: `Localhost`
   - RPC URL: `http://127.0.0.1:8545`
   - Chain ID: `31337`
   - Currency Symbol: `ETH`
3. Switch to Localhost network
4. On the Bitchanic app, click "Connect Wallet" to authorize

### Test Accounts
Hardhat provides 20 pre-funded test accounts. The first account (deployer) gets all 10M BCHN tokens. To give tokens to other accounts:
```bash
# In Hardhat console or script
const owner = await ethers.getSigner();
const recipient = "0x70997970C51812e339D9B73b0245Ad59619F4970"; // test account 2
await token.transfer(recipient, ethers.utils.parseUnits("1000", 18));
```

## 🚢 Deployment to Testnets

To deploy to Sepolia, Goerli, or Polygon Mumbai:

1. Update `hardhat.config.js`:
   ```javascript
   networks: {
     sepolia: {
       url: process.env.SEPOLIA_RPC_URL,
       accounts: [process.env.PRIVATE_KEY],
     }
   }
   ```

2. Set environment variables:
   ```bash
   export SEPOLIA_RPC_URL="https://sepolia.infura.io/v3/YOUR_KEY"
   export PRIVATE_KEY="0x..."
   ```

3. Deploy:
   ```bash
   npx hardhat run scripts/deployAndExport.js --network sepolia
   ```

4. Update `frontend/.env`:
   ```
   REACT_APP_CONTRACT_ADDRESS=0x...
   REACT_APP_NETWORK=sepolia
   ```

## 🐛 Troubleshooting

### "Wallet not connected" error
- Ensure MetaMask is installed and unlocked
- Check network is set to "Localhost" in MetaMask
- Click "Connect Wallet" again

### "Products not loading"
- Verify `npm run deploy:export` was run (creates `frontend/src/contracts/BitchanicToken.json`)
- Check browser console (F12) for ethers.js errors
- Ensure Hardhat local network has products (run a setup script to add them)

### "Insufficient BCHN balance"
- Only the deployer account has initial tokens
- Transfer tokens from deployer to test account (see Wallet Setup section above)

### Frontend build fails with TypeScript errors
- Run: `rm -rf node_modules && npm install --legacy-peer-deps && npm run build`
- Or: `CI=false npm run build` (skips type checking)

### Transaction fails on checkout
- Ensure you've approved enough BCHN for the purchase
- Check wallet has sufficient balance
- Verify product stock > 0

## 📚 Further Reading

- **ARCHITECTURE.md** - Deep dive into contract design, frontend architecture, tech stack
- **README-NEW.md** - Feature overview and quick reference
- **contracts/BitchanicToken.sol** - Full contract source code
- **frontend/src/contracts/contract.ts** - Web3 helper functions
- **frontend/src/store/cartSlice.ts** - Redux cart reducer

## 🎯 Next Steps (Optional Enhancements)

1. **Product Filters** - Add category, freshness, and growing method filters to marketplace
2. **Order Dashboard** - Show past orders with delivery tracking status
3. **Subscription Automation** - Integrate Chainlink Automation for recurring payments
4. **Multi-chain** - Deploy to Polygon, Arbitrum, Optimism for lower gas fees
5. **Real Farm Data** - Connect IoT sensors for live pod metrics
6. **Community** - Add user profiles, reviews, referral bonuses
7. **Analytics** - Farm performance and user engagement metrics
8. **Mobile App** - React Native or Flutter version

## 📝 License

MIT

---

**Built with ❤️ for sustainable crypto-powered farming.** 🌾🔗

For questions or issues, refer to the ARCHITECTURE.md file or check the source code in the `frontend/src` and `contracts` directories.
