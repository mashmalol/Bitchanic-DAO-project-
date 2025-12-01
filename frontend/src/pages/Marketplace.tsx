import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import ProductCard from '../components/ProductCard';
import { getAllProducts, subscribeToProducePurchased } from '../contracts/contract';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

export default function Marketplace() {
  const [products, setProducts] = useState<any[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const prods = await getAllProducts();
        if (mounted) setProducts(prods.map(p => ({ ...p, price: (Number(p.price) / 1e18).toString() })));
      } catch (err) {
        console.error('Failed to load products', err);
      }
    }
    load();
    // subscribe to on-chain purchases to update stock live
    const unsubscribe = subscribeToProducePurchased((buyer, productId, quantity) => {
      setProducts(prev => prev.map(p => p.id === productId ? { ...p, stock: Math.max(0, p.stock - quantity) } : p));
    });
    return () => { mounted = false; if (unsubscribe) unsubscribe(); };
  }, []);

  if (products.length === 0) return <Typography>{t('marketplace.loading')}</Typography>;

  return (
    <Grid container spacing={3}>
      {products.map(p => (
        <Grid item xs={12} sm={6} md={4} key={p.id} sx={{ display: 'flex' }}>
          <ProductCard product={p} />
        </Grid>
      ))}
    </Grid>
  );
}
