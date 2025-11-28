import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { clearCart } from '../store/cartSlice';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ethers } from 'ethers';
import { approve, purchaseProduce, tokenAddress, estimateGasForPurchase } from '../contracts/contract';
import TxStatus from '../components/TxStatus';
import { useTranslation } from 'react-i18next';

export default function Checkout() {
  const items = useSelector((s: RootState) => s.cart.items);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const total = items.reduce((acc, it) => acc + parseFloat(it.price) * it.quantity, 0);

  async function handleCheckout() {
    try {
      // Approve total to the token contract itself (contract expects allowance to itself)
      const amount = ethers.utils.parseUnits(total.toFixed(0), 18);
      // estimate gas for each purchase to show user an estimate
      let totalGas = ethers.BigNumber.from(0);
      for (const it of items) {
        const gas = await estimateGasForPurchase(it.id, it.quantity);
        if (gas) totalGas = totalGas.add(gas);
      }
  const gasEth = totalGas.isZero() ? 'N/A' : ethers.utils.formatUnits(totalGas.mul(ethers.BigNumber.from('1000000000')), 18); // rough: gas * 1 gwei -> ETH

  if (gasEth !== 'N/A') {
        const ok = window.confirm(`${t('checkout.estimatedGas')} (rough): ${gasEth} ETH. ${t('common.confirm')}?`);
        if (!ok) return;
      }

      const approveTx = await approve(tokenAddress, amount);
      setTxs(prev => [...prev, approveTx.hash]);
      await approveTx.wait();
      for (const it of items) {
        const tx = await purchaseProduce(it.id, it.quantity);
        setTxs(prev => [...prev, tx.hash]);
        await tx.wait();
      }
      dispatch(clearCart());
      alert(t('checkout.success'));
    } catch (err: any) {
      console.error(err);
      alert(t('checkout.error') + ': ' + (err.message || err));
    }
  }

  const [txs, setTxs] = React.useState<string[]>([]);

  return (
    <div>
      <Typography variant="h5">{t('checkout.title')}</Typography>
      {items.length === 0 ? (
        <Typography>{t('cart.empty')}</Typography>
      ) : (
        <div>
          {items.map(it => (
            <div key={it.id} style={{ marginTop: 8 }}>
              <Typography>{it.name} — {it.quantity} × {it.price} BCHN</Typography>
            </div>
          ))}
          <Typography sx={{ mt: 2 }}>{t('cart.total')}: {total.toFixed(2)} BCHN</Typography>
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleCheckout}>{t('checkout.pay')}</Button>
          {txs.map(tx => (
            <div key={tx}>
              <TxStatus txHash={tx} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
