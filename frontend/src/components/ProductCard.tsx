import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { useTranslation } from 'react-i18next';

export default function ProductCard({ product }: any) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  function onAdd() {
    dispatch(addToCart({ id: product.id, name: product.name, price: product.price, quantity: 1 }));
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography color="text.secondary">{t('product.price')}: {product.price} BCHN</Typography>
        <Typography color="text.secondary">{t('product.stock')}: {product.stock}</Typography>
        <Typography variant="body2">{t('product.harvest')}: {new Date(product.harvestDate).toLocaleDateString()}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" onClick={onAdd}>{t('cart.addedToCart')}</Button>
        <Button size="small">{t('marketplace.view')}</Button>
      </CardActions>
    </Card>
  );
}
