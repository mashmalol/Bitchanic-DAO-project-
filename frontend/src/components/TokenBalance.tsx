import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ethers } from 'ethers';
import { getProvider, getSigner, getBalance, tokenAddress } from '../contracts/contract';

export default function TokenBalance() {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>('0');

  useEffect(() => {
    if ((window as any).ethereum) {
      (window as any).ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length) setAccount(accounts[0]);
        else setAccount(null);
      });
    }
  }, []);

  async function connect() {
    try {
      const provider = getProvider();
      await (provider as any).send('eth_requestAccounts', []);
      const signer = await getSigner();
      const addr = await signer.getAddress();
      setAccount(addr);
      const bal = await getBalance(addr);
      setBalance(ethers.utils.formatUnits(bal, 18));
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {account ? (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Typography>{account.slice(0,6)}...{account.slice(-4)}</Typography>
          <Typography variant="body2">BCHN: {balance}</Typography>
        </div>
      ) : (
        <Button color="inherit" onClick={connect}>Connect Wallet</Button>
      )}
    </div>
  );
}
