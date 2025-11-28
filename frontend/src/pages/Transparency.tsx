import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';

// Sustainability Meter Component
function SustainabilityMeter() {
  const { t } = useTranslation();
  const carbonSavedKg = 247.5; // kg CO2 saved by farm vs traditional farming
  const energyFromMining = 65; // % of farm energy from crypto mining waste heat
  const waterSaved = 92; // % water saved vs traditional
  const podStatus = [
    { id: 1, name: 'Pod A - Lettuce', health: 98, temp: 22.1, humidity: 65 },
    { id: 2, name: 'Pod B - Basil', health: 94, temp: 23.5, humidity: 62 },
    { id: 3, name: 'Pod C - Tomato', health: 88, temp: 24.0, humidity: 70 }
  ];

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 3 }}>{t('transparency.title')}</Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                {t('transparency.carbonSaved')}
              </Typography>
              <Typography variant="h5">{carbonSavedKg.toFixed(1)} kg</Typography>
              <Typography variant="body2" color="text.secondary">
                CO₂ {t('transparency.carbonSaved')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                {t('transparency.renewableEnergy')}
              </Typography>
              <Typography variant="h5">{energyFromMining}%</Typography>
              <Typography variant="body2" color="text.secondary">
                {t('transparency.miningWasteHeat')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                {t('transparency.waterSaved')}
              </Typography>
              <Typography variant="h5">{waterSaved}%</Typography>
              <Typography variant="body2" color="text.secondary">
                {t('transparency.waterSaved')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                {t('transparency.environmentalValue')}
              </Typography>
              <Typography variant="h5">$1,248</Typography>
              <Typography variant="body2" color="text.secondary">
                {t('transparency.environmentalValue')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h6" sx={{ mb: 2 }}>{t('transparency.podStatus')}</Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {podStatus.map(pod => (
          <Grid item xs={12} sm={6} md={4} key={pod.id}>
            <Card>
              <CardContent>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>{pod.name}</strong>
                </Typography>
                <Box sx={{ mb: 1 }}>
                  <Typography variant="caption">{t('transparency.health')}: {pod.health}%</Typography>
                  <LinearProgress variant="determinate" value={pod.health} sx={{ mt: 0.5 }} />
                </Box>
                <Typography variant="body2">🌡️ {pod.temp}°C</Typography>
                <Typography variant="body2">💧 {pod.humidity}% {t('transparency.humidity')}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" sx={{ mb: 2 }}>{t('transparency.energyBreakdown')}</Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>{t('transparency.miningWasteHeat')}</strong>
              </Typography>
              <Typography variant="caption" display="block">65%</Typography>
              <LinearProgress variant="determinate" value={65} sx={{ mt: 1 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>{t('transparency.climateControl')}</strong>
              </Typography>
              <Typography variant="caption" display="block">25%</Typography>
              <LinearProgress variant="determinate" value={25} sx={{ mt: 1 }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>{t('transparency.irrigation')}</strong>
              </Typography>
              <Typography variant="caption" display="block">10%</Typography>
              <LinearProgress variant="determinate" value={10} sx={{ mt: 1 }} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Typography variant="h6" sx={{ mb: 2 }}>{t('transparency.cameraFeed')}</Typography>
      <Card>
        <CardContent>
          <Box sx={{ width: '100%', height: 300, bgcolor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography color="text.secondary">{t('transparency.cameraFeed')}</Typography>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

export default SustainabilityMeter;
