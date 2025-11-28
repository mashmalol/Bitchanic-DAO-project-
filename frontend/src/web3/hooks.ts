import { ethers } from 'ethers';

export function getProvider(): any {
  if ((window as any).ethereum) {
    return new ethers.providers.Web3Provider((window as any).ethereum);
  }
  return ethers.getDefaultProvider();
}

export async function getSigner(): Promise<any> {
  const p: any = getProvider();
  if (p.getSigner) return p.getSigner();
  throw new Error('No signer available - MetaMask or Web3 provider required');
}
