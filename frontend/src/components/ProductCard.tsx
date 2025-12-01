import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { useTranslation } from 'react-i18next';
import playBeep from '../lib/sfx';

import Box from '@mui/material/Box';
import bagIcon from '../svgs/farming-bag-wheat-svgrepo-com.svg';
import viewIcon from '../svgs/farming-information-agriculture-svgrepo-com.svg';

export default function ProductCard({ product }: any) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  function onAdd() {
    dispatch(addToCart({ id: product.id, name: product.name, price: product.price, quantity: 1 }));
    try { playBeep({ freq: 1100, duration: 0.06, volume: 0.14 }); } catch (e) { }
  }

  return (
  <Card className="retro-card" sx={{ p: 0, borderLeft: '6px solid rgba(127,255,127,0.12)', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
      {product.image && (
        <Box
          sx={{
            height: 160,
            backgroundImage: `url(${product.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
          }}
        >
          {/* subtle vignette */}
          <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.35) 100%)' }} />
        </Box>
      )}
      <CardContent sx={{ pt: 3, pb: 1, px: 2, flexGrow: 1 }}>
        <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 700, mb: 0.5, fontFamily: 'Press Start 2P, monospace', fontSize: '12px' }}>{product.name}</Typography>
        <Typography color="text.secondary" sx={{ mb: 0.5, fontFamily: 'Press Start 2P, monospace', fontSize: '11px' }}>{t('product.price')}: {product.price} BCHN</Typography>
        <Typography color="text.secondary" sx={{ mb: 0.5, fontFamily: 'Press Start 2P, monospace', fontSize: '11px' }}>{t('product.stock')}: {product.stock}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', fontFamily: 'Press Start 2P, monospace', fontSize: '10px' }}>{t('product.harvest')}: {new Date(product.harvestDate).toLocaleDateString()}</Typography>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2, pt: 0, mt: 'auto', display: 'flex', justifyContent: 'flex-start' }}>
  <Button size="small" variant="contained" onClick={onAdd} sx={{ mr: 1, boxShadow: '0 6px 14px rgba(11,61,30,0.28)' }} startIcon={<img src={bagIcon} alt="add" width={16} height={16} style={{ imageRendering: 'pixelated' }} />}>{t('cart.addedToCart')}</Button>
  <Button size="small" sx={{ color: 'text.secondary' }} startIcon={<img src={viewIcon} alt="view" width={16} height={16} style={{ imageRendering: 'pixelated' }} />}>{t('marketplace.view')}</Button>
      </CardActions>
    </Card>
  );
}
