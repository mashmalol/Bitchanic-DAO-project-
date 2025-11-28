import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { getProvider } from '../contracts/contract';

export default function TxStatus({ txHash }: { txHash: string }) {
  const [status, setStatus] = useState<'pending' | 'confirmed' | 'failed' | 'idle'>('idle');

  useEffect(() => {
    if (!txHash) return;
    let mounted = true;
    async function monitor() {
      try {
        setStatus('pending');
        const provider: any = getProvider();
        const receipt = await provider.waitForTransaction(txHash, 1, 60000); // wait for 1 confirmation or 60s
        if (!mounted) return;
        if (receipt && receipt.confirmations && receipt.status === 1) setStatus('confirmed');
        else setStatus('failed');
      } catch (err) {
        console.error('tx monitor error', err);
        if (mounted) setStatus('failed');
      }
    }
    monitor();
    return () => { mounted = false; };
  }, [txHash]);

  if (!txHash) return null;

  return (
    <div style={{ marginTop: 8 }}>
      <Typography variant="body2">Tx: {txHash}</Typography>
      {status === 'pending' && <div><LinearProgress /><Typography variant="caption">Pending</Typography></div>}
      {status === 'confirmed' && <Typography variant="caption">Confirmed ✅</Typography>}
      {status === 'failed' && <Typography variant="caption">Failed ❌</Typography>}
    </div>
  );
}
