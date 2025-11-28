import React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { removeFromCart } from '../store/cartSlice';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function CartDrawer() {
  const [open, setOpen] = React.useState(false);
  const items = useSelector((s: RootState) => s.cart.items);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const total = items.reduce((acc, it) => acc + parseFloat(it.price) * it.quantity, 0);

  return (
    <div>
      <Button color="inherit" onClick={() => setOpen(true)}>{t('cart.title')} ({items.length})</Button>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <div style={{ width: 360, padding: 16 }}>
          <Typography variant="h6">{t('cart.title')}</Typography>
          <Divider sx={{ my: 1 }} />
          <List>
            {items.map(it => (
              <ListItem key={it.id} secondaryAction={<Button onClick={() => dispatch(removeFromCart(it.id))}>{t('cart.remove')}</Button>}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography>{it.name}</Typography>
                  <Typography variant="body2">{it.quantity} × {it.price} BCHN</Typography>
                </div>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 1 }} />
          <Typography>{t('cart.total')}: {total.toFixed(2)} BCHN</Typography>
          <Button variant="contained" component={RouterLink} to="/checkout" onClick={() => setOpen(false)} sx={{ mt: 2 }}>{t('cart.checkout')}</Button>
        </div>
      </Drawer>
    </div>
  );
}
