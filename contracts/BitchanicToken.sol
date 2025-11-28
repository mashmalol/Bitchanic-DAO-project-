// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BitchanicToken is ERC20, Ownable {
    uint8 private constant _DECIMALS = 18;
    uint256 public constant INITIAL_SUPPLY = 10_000_000 * (10 ** uint256(_DECIMALS));

    struct Product {
        uint256 id;
        string name;
        uint256 price; // price in BCHN with decimals
        uint256 stock;
        uint256 harvestDate; // unix timestamp
        string metadataURI; // optional
    }

    struct Order {
        uint256 orderId;
        address buyer;
        uint256 productId;
        uint256 quantity;
        uint256 totalCost;
        uint256 timestamp;
    }

    uint256 public productCount;
    uint256 public orderCount;

    mapping(uint256 => Product) public products;
    mapping(address => Order[]) private userOrders;
    mapping(address => uint256) private loyaltyPoints;

    // Fees (in basis points, 10000 = 100%)
    uint256 public maintenanceFeeBP = 200; // 2%
    uint256 public liquidityFeeBP = 100; // 1%

    // Accumulated liquidity tokens in contract
    uint256 public accumulatedLiquidity;

    event ProducePurchased(address indexed buyer, uint256 productId, uint256 quantity, uint256 totalCost, uint256 orderId);
    event SubscriptionCreated(address indexed user, uint256 planId, uint256 durationMonths);
    event LoyaltyRewardClaimed(address indexed user, uint256 points);

    constructor() ERC20("Bitchanic Token", "BCHN") {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    function decimals() public pure override returns (uint8) {
        return _DECIMALS;
    }

    /*************** Product & Order Management ***************/
    function addNewProduct(string memory name, uint256 price, uint256 initialStock, uint256 harvestDate, string memory metadataURI) external onlyOwner {
        productCount++;
        products[productCount] = Product({
            id: productCount,
            name: name,
            price: price,
            stock: initialStock,
            harvestDate: harvestDate,
            metadataURI: metadataURI
        });
    }

    function updateProductStock(uint256 productId, uint256 newStock) external onlyOwner {
        require(products[productId].id != 0, "Product does not exist");
        products[productId].stock = newStock;
    }

    function withdrawProceeds(address to, uint256 amount) external onlyOwner {
        require(balanceOf(address(this)) >= amount, "Insufficient contract balance");
        _transfer(address(this), to, amount);
    }

    /*************** Purchase & Subscription ***************/
    // Buyers must approve this contract to spend BCHN before calling
    function purchaseProduce(uint256 productId, uint256 quantity) external {
        require(products[productId].id != 0, "Product not found");
        Product storage p = products[productId];
        require(p.stock >= quantity, "Not enough stock");
        uint256 totalPrice = p.price * quantity;
        require(balanceOf(msg.sender) >= totalPrice, "Insufficient BCHN balance");
        // Calculate fees
        uint256 maintenanceFee = (totalPrice * maintenanceFeeBP) / 10000;
        uint256 liquidityFee = (totalPrice * liquidityFeeBP) / 10000;
        uint256 net = totalPrice - maintenanceFee - liquidityFee;

        // Spend allowance (if any) by consuming allowance; buyers must have approved the token contract
        // Using allowance model: require allowance >= totalPrice
        uint256 allowanceForContract = allowance(msg.sender, address(this));
        require(allowanceForContract >= totalPrice, "Approve BCHN spending first");
        _spendAllowance(msg.sender, address(this), totalPrice);

        // Transfer net to owner (farm proceeds), fees to contract
        if (net > 0) {
            _transfer(msg.sender, owner(), net);
        }
        if (maintenanceFee + liquidityFee > 0) {
            _transfer(msg.sender, address(this), maintenanceFee + liquidityFee);
        }

        // Accumulate liquidity portion
        accumulatedLiquidity += liquidityFee;

        // Decrease stock
        p.stock -= quantity;

        // Record order
        orderCount++;
        Order memory ord = Order({
            orderId: orderCount,
            buyer: msg.sender,
            productId: productId,
            quantity: quantity,
            totalCost: totalPrice,
            timestamp: block.timestamp
        });
        userOrders[msg.sender].push(ord);

        // Loyalty: 1 point per token (scaled down) - simple model: 1 point per 1 BCHN (consider decimals)
        // For simplicity, award points = totalPrice / (10**decimals()) i.e., whole tokens
        uint256 points = totalPrice / (10 ** uint256(_DECIMALS));
        loyaltyPoints[msg.sender] += points;

        emit ProducePurchased(msg.sender, productId, quantity, totalPrice, orderCount);
    }

    function subscribeToDelivery(uint256 planId, uint256 months) external {
        require(months >= 1, "Minimum 1 month");
        // For simplicity, plan pricing is encoded in planId: owner can interpret, here we use fixed monthly rate per planId
        uint256 monthlyPrice = _planPrice(planId);
        uint256 total = monthlyPrice * months;
        require(balanceOf(msg.sender) >= total, "Insufficient BCHN balance for subscription");
        uint256 allowanceForContract = allowance(msg.sender, address(this));
        require(allowanceForContract >= total, "Approve BCHN spending first");
        _spendAllowance(msg.sender, address(this), total);

        // Transfer subscription payment to owner (farm proceeds)
        _transfer(msg.sender, owner(), total);

        // Record subscription event (dumb model - staking recurring not fully automated on-chain)
        emit SubscriptionCreated(msg.sender, planId, months);
    }

    function _planPrice(uint256 planId) internal pure returns (uint256) {
        // Example: planId 1 => weekly box price per month (approx) 100 BCHN, planId 2 => 250 BCHN
        if (planId == 1) return 100 * (10 ** uint256(_DECIMALS));
        if (planId == 2) return 250 * (10 ** uint256(_DECIMALS));
        return 150 * (10 ** uint256(_DECIMALS));
    }

    /*************** Loyalty & Rewards ***************/
    function getLoyaltyPoints(address user) external view returns (uint256) {
        return loyaltyPoints[user];
    }

    function claimLoyaltyRewards() external {
        uint256 pts = loyaltyPoints[msg.sender];
        require(pts > 0, "No loyalty points");
        // For simplicity, 1 point = 0.1 BCHN (10% of a token) - scaled
        uint256 reward = (pts * (10 ** uint256(_DECIMALS))) / 10; // pts * 0.1 * 1e18
        // Cap reward to contract balance
        uint256 available = balanceOf(address(this));
        if (reward > available) reward = available;
        loyaltyPoints[msg.sender] = 0;
        if (reward > 0) {
            _transfer(address(this), msg.sender, reward);
        }
        emit LoyaltyRewardClaimed(msg.sender, pts);
    }

    /*************** Utility & View ***************/
    function getUserOrderHistory(address user) external view returns (Order[] memory) {
        return userOrders[user];
    }

    function checkSubscriptionStatus(address user) external pure returns (bool) {
        // On-chain subscriptions are off-chain-managed in this simple model
        return false;
    }

    // Owner can burn tokens from their balance
    function burnTokens(uint256 amount) external {
        _burn(msg.sender, amount);
    }

    // Owner can change fee parameters
    function setFees(uint256 _maintenanceBP, uint256 _liquidityBP) external onlyOwner {
        require(_maintenanceBP + _liquidityBP <= 1000, "Fees too high"); // max 10%
        maintenanceFeeBP = _maintenanceBP;
        liquidityFeeBP = _liquidityBP;
    }

    // Owner can withdraw accumulated liquidity and maintenance tokens to address
    function withdrawAccumulated(address to) external onlyOwner {
        uint256 bal = balanceOf(address(this));
        require(bal > 0, "No balance");
        accumulatedLiquidity = 0;
        _transfer(address(this), to, bal);
    }
}
