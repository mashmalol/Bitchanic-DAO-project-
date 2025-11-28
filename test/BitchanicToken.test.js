const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BitchanicToken", function () {
  let Token, token, owner, addr1, addr2;

  beforeEach(async function () {
    Token = await ethers.getContractFactory("BitchanicToken");
    [owner, addr1, addr2] = await ethers.getSigners();
    token = await Token.deploy();
    await token.deployed();
  });

  it("should have correct initial supply assigned to owner", async function () {
    const ownerBal = await token.balanceOf(owner.address);
    expect(ownerBal.toString()).to.equal(ethers.utils.parseUnits("10000000", 18).toString());
  });

  it("owner can add product and users can purchase produce", async function () {
    // Add product
    const price = ethers.utils.parseUnits("10", 18); // 10 BCHN
    await token.addNewProduct("Lettuce", price, 100, Math.floor(Date.now() / 1000), "");

    // Transfer some tokens to addr1
    await token.transfer(addr1.address, ethers.utils.parseUnits("1000", 18));

    // addr1 approve contract to spend
    await token.connect(addr1).approve(token.address, ethers.utils.parseUnits("100", 18));

    // Purchase 2 units (total 20 BCHN)
    await token.connect(addr1).purchaseProduce(1, 2);

    // Verify stock decreased
  const p = await token.products(1);
  expect(p.stock.toNumber()).to.equal(98);

    // Verify order recorded
  const orders = await token.getUserOrderHistory(addr1.address);
  // orders.length may be a BigNumber in this return format
  const ordersLen = orders.length.toNumber ? orders.length.toNumber() : orders.length;
  expect(ordersLen).to.equal(1);
  expect(orders[0].productId.toNumber ? orders[0].productId.toNumber() : orders[0].productId).to.equal(1);
  });

  it("loyalty points accumulate and can be claimed (when contract has balance)", async function () {
    const price = ethers.utils.parseUnits("1", 18);
    await token.addNewProduct("Herb", price, 10, Math.floor(Date.now() / 1000), "");
    await token.transfer(addr1.address, ethers.utils.parseUnits("10", 18));
    await token.connect(addr1).approve(token.address, ethers.utils.parseUnits("10", 18));
    await token.connect(addr1).purchaseProduce(1, 2); // 2 tokens -> 2 points

  const pts = await token.getLoyaltyPoints(addr1.address);
  expect(pts.toNumber()).to.equal(2);

    // Give some contract balance to allow claim
    await token.transfer(token.address, ethers.utils.parseUnits("1", 18));
    await token.connect(addr1).claimLoyaltyRewards();
  const ptsAfter = await token.getLoyaltyPoints(addr1.address);
  expect(ptsAfter.toNumber ? ptsAfter.toNumber() : ptsAfter).to.equal(0);
  });
});
