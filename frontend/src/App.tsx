import React, { useEffect, Suspense, lazy } from 'react';
import harvestIcon from './svgs/harvest-svgrepo-com.svg';
import bagIcon from './svgs/farming-bag-wheat-svgrepo-com.svg';
import hydroIcon from './svgs/hydroponic-soilless-farm-svgrepo-com.svg';
import { Routes, Route, Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';
const Landing = lazy(() => import('./pages/Landing'));
const Marketplace = lazy(() => import('./pages/Marketplace'));
import TokenBalance from './components/TokenBalance';
import CartDrawer from './components/CartDrawer';
import Checkout from './pages/Checkout';
import Subscriptions from './pages/Subscriptions';
import Loyalty from './pages/Loyalty';
import Transparency from './pages/Transparency';

interface AppProps {
  themeMode?: 'light' | 'dark';
  toggleTheme?: () => void;
}

function App({ themeMode = 'dark', toggleTheme }: AppProps) {
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton component={Link} to="/" aria-label="home" sx={{ color: 'inherit' }}>
              <img src={harvestIcon} alt="home" width={22} height={22} style={{ imageRendering: 'pixelated' }} />
            </IconButton>
            <IconButton component={Link} to="/marketplace" aria-label="marketplace" sx={{ color: 'inherit' }}>
              <img src={bagIcon} alt="marketplace" width={22} height={22} style={{ imageRendering: 'pixelated' }} />
            </IconButton>
            <IconButton component={Link} to="/subscriptions" aria-label="subscriptions" sx={{ color: 'inherit' }}>
              <img src={hydroIcon} alt="subscriptions" width={22} height={22} style={{ imageRendering: 'pixelated' }} />
            </IconButton>
          </Box>
          <Button onClick={toggleLanguage} sx={{ ml: 2, color: 'inherit' }}>
            {i18n.language === 'en' ? 'فارسی' : 'EN'}
          </Button>
          {/* Theme toggle */}
          <Button onClick={toggleTheme} sx={{ ml: 1, color: 'inherit', fontWeight: 600 }}>
            {themeMode === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </Button>
          <CartDrawer />
          <TokenBalance />
        </Toolbar>
      </AppBar>
      {/* CRT scanline overlay for retro look */}
      <div className="crt-overlay" aria-hidden="true" />
      <Container sx={{ mt: 4 }}>
        <Suspense fallback={<div aria-busy="true">Loading…</div>}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/loyalty" element={<Loyalty />} />
            <Route path="/transparency" element={<Transparency />} />
          </Routes>
        </Suspense>
      </Container>
    </div>
  );
}

export default App;
