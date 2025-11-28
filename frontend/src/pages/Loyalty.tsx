import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { getSigner, getTokenContract } from '../contracts/contract';
import { ethers } from 'ethers';
import { useTranslation } from 'react-i18next';

export default function Loyalty() {
  const [points, setPoints] = useState<number>(0);
  const [account, setAccount] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    async function loadPoints() {
      try {
        const signer = await getSigner();
        const addr = await signer.getAddress();
        setAccount(addr);
        const contract = getTokenContract();
        const pts = await contract.getLoyaltyPoints(addr);
        setPoints(pts.toNumber());
      } catch (err) {
        console.error('Failed to load loyalty points', err);
      }
    }
    loadPoints();
  }, []);

  async function claimRewards() {
    try {
      setLoading(true);
      const signer = await getSigner();
      const contract = getTokenContract(signer);
      const tx = await contract.claimLoyaltyRewards();
      await tx.wait();
      alert(t('loyalty.success'));
      setPoints(0);
    } catch (err: any) {
      console.error(err);
      alert(t('loyalty.error') + ': ' + (err.message || err));
    } finally {
      setLoading(false);
    }
  }

  const tiers = [
    { nameKey: 'loyalty.bronze', points: 0, rewardKey: '5% discount' },
    { nameKey: 'loyalty.silver', points: 50, rewardKey: '10% discount + free shipping' },
    { nameKey: 'loyalty.gold', points: 150, rewardKey: '15% discount + priority delivery' },
    { nameKey: 'loyalty.platinum', points: 300, rewardKey: '20% discount + exclusive produce' }
  ];

  const currentTier = tiers.reduce((best, tier) => points >= tier.points ? tier : best, tiers[0]);

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 2 }}>{t('loyalty.title')}</Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">{t('loyalty.points')}: {points}</Typography>
          <Typography color="text.secondary">{t('loyalty.tier')}: {t(currentTier.nameKey)}</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>{t('loyalty.unlockedBenefit')}: {currentTier.rewardKey}</Typography>
          <Typography variant="caption" sx={{ mt: 2, display: 'block' }}>
            {account && `${t('wallet.address')}: ${account.slice(0, 6)}...${account.slice(-4)}`}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" disabled={loading || points === 0} onClick={claimRewards}>
            {loading ? t('common.loading') : t('loyalty.claimRewards')}
          </Button>
        </CardActions>
      </Card>

      <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>{t('loyalty.title')} Benefits</Typography>
      {tiers.map(tier => (
        <Card key={tier.nameKey} sx={{ mb: 1, opacity: points >= tier.points ? 1 : 0.6 }}>
          <CardContent>
            <Typography variant="body2">
              <strong>{t(tier.nameKey)}</strong> ({tier.points}+ {t('loyalty.points')}): {tier.rewardKey}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
