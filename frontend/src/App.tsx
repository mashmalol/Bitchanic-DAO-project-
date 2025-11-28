import React, { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import Marketplace from './pages/Marketplace';
import TokenBalance from './components/TokenBalance';
import CartDrawer from './components/CartDrawer';
import Checkout from './pages/Checkout';
import Subscriptions from './pages/Subscriptions';
import Loyalty from './pages/Loyalty';
import Transparency from './pages/Transparency';

function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const currentLang = i18n.language;
    document.documentElement.dir = currentLang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
  }, [i18n.language]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fa' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {t('header.title')}
          </Typography>
          <Button color="inherit" component={Link} to="/marketplace">{t('nav.marketplace')}</Button>
          <Button color="inherit" component={Link} to="/subscriptions">{t('nav.subscribe')}</Button>
          <Button color="inherit" component={Link} to="/loyalty">{t('nav.loyalty')}</Button>
          <Button color="inherit" component={Link} to="/transparency">{t('nav.transparency')}</Button>
          <Button color="inherit" onClick={toggleLanguage} sx={{ ml: 2 }}>
            {i18n.language === 'en' ? 'فارسی' : 'EN'}
          </Button>
          <CartDrawer />
          <TokenBalance />
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Typography>Landing page coming soon.</Typography>} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/loyalty" element={<Loyalty />} />
          <Route path="/transparency" element={<Transparency />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
