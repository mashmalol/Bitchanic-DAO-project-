import { ethers } from 'ethers';
const contractJson = require('./BitchanicToken.json');

export const tokenAddress: string = contractJson.address;
export const tokenAbi: any = contractJson.abi;

export function getProvider(): any {
  if ((window as any).ethereum) {
    return new ethers.providers.Web3Provider((window as any).ethereum);
  }
  return ethers.getDefaultProvider();
}

export async function getSigner(): Promise<any> {
  const p: any = getProvider();
  if (p.getSigner) return p.getSigner();
  throw new Error('No signer available');
}

export function getTokenContract(signerOrProvider?: any) {
  const provider = signerOrProvider ?? getProvider();
  return new ethers.Contract(tokenAddress, tokenAbi, provider);
}

export async function getBalance(address: string) {
  const contract = getTokenContract();
  const bal = await contract.balanceOf(address);
  return bal;
}

export async function approve(spender: string, amount: ethers.BigNumberish) {
  const signer = await getSigner();
  const contract = getTokenContract(signer);
  return contract.approve(spender, amount);
}

export async function purchaseProduce(productId: number, quantity: number) {
  const signer = await getSigner();
  const contract = getTokenContract(signer);
  return contract.purchaseProduce(productId, quantity);
}

// Product accessors
export async function getProductCount(): Promise<number> {
  const contract = getTokenContract();
  const cnt = await contract.productCount();
  return cnt.toNumber();
}

export async function getProduct(productId: number) {
  const contract = getTokenContract();
  const p = await contract.products(productId);
  // products: id, name, price, stock, harvestDate, metadataURI
  return {
    id: p.id.toNumber(),
    name: p.name,
    price: p.price.toString(),
    stock: p.stock.toNumber(),
    harvestDate: p.harvestDate.toNumber(),
    metadataURI: p.metadataURI
  };
}

export async function getAllProducts() {
  const count = await getProductCount();
  const arr = [];
  for (let i = 1; i <= count; i++) {
    arr.push(await getProduct(i));
  }
  return arr;
}

export function getProviderNetwork() {
  return getProvider();
}

// Estimate gas for purchasing a product (uses signer if available)
export async function estimateGasForPurchase(productId: number, quantity: number) {
  try {
    const signer = await getSigner();
    const contract = getTokenContract(signer);
    const gasEstimate = await contract.estimateGas.purchaseProduce(productId, quantity);
    return gasEstimate;
  } catch (err) {
    // Fallback to provider estimate (may fail if requires signer)
    const contract = getTokenContract();
    try {
      const gasEstimate = await contract.estimateGas.purchaseProduce(productId, quantity);
      return gasEstimate;
    } catch (e) {
      console.warn('estimateGas failed', e);
      return null;
    }
  }
}

// Subscribe to ProducePurchased events and invoke callback(buyer, productId, quantity, totalCost, orderId)
export function subscribeToProducePurchased(callback: (buyer: string, productId: number, quantity: number, totalCost: string, orderId: number) => void) {
  const contract = getTokenContract();
  if (!contract) return () => {};
  const handler = (buyer: string, productId: any, quantity: any, totalCost: any, orderId: any) => {
    try {
      callback(buyer, productId.toNumber(), quantity.toNumber(), totalCost.toString(), orderId.toNumber());
    } catch (err) {
      console.error('event handler error', err);
    }
  };
  contract.on('ProducePurchased', handler);
  return () => {
    contract.off('ProducePurchased', handler);
  };
}
