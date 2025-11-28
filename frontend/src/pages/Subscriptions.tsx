import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { ethers } from 'ethers';
import { getSigner, getTokenContract, tokenAddress } from '../contracts/contract';
import { useTranslation } from 'react-i18next';

const subscriptionPlans = [
  { id: 1, nameKey: 'subscriptions.weekly', descKey: 'subscriptions.weeklyDesc', monthsLabel: 'subscriptions.weeklyPrice', months: 1, price: '100' },
  { id: 2, nameKey: 'subscriptions.monthly', descKey: 'subscriptions.monthlyDesc', monthsLabel: 'subscriptions.monthlyPrice', months: 3, price: '250' },
  { id: 3, nameKey: 'subscriptions.quarterly', descKey: 'subscriptions.quarterlyDesc', monthsLabel: 'subscriptions.quarterlyPrice', months: 6, price: '500' }
];

export default function Subscriptions() {
  const [txHash, setTxHash] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  async function handleSubscribe(planId: number, price: string) {
    try {
      setLoading(true);
      const signer = await getSigner();
      const contract = getTokenContract(signer);
      const amount = ethers.utils.parseUnits(price, 18);
      
      // Approve
      const approveTx = await contract.approve(tokenAddress, amount);
      await approveTx.wait();
      
      // Subscribe (calls subscribeToDelivery with months=1)
      const tx = await contract.subscribeToDelivery(planId, 1);
      setTxHash(tx.hash);
      await tx.wait();
      alert(t('subscriptions.success'));
    } catch (err: any) {
      console.error(err);
      alert(t('subscriptions.error') + ': ' + (err.message || err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 2 }}>{t('subscriptions.title')}</Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        {t('subscriptions.description')}
      </Typography>
      <Grid container spacing={2}>
        {subscriptionPlans.map(plan => (
          <Grid item xs={12} sm={6} md={4} key={plan.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{t(plan.nameKey)}</Typography>
                <Typography color="text.secondary" variant="body2">{t(plan.descKey)}</Typography>
                <Typography variant="h5" sx={{ mt: 2 }}>{plan.price} BCHN / {t('subscriptions.duration')}</Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" disabled={loading} onClick={() => handleSubscribe(plan.id, plan.price)}>
                  {loading ? t('common.loading') : t('subscriptions.subscribeNow')}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {txHash && (
        <Typography sx={{ mt: 3 }} variant="body2">
          Tx: {txHash}
        </Typography>
      )}
    </div>
  );
}
