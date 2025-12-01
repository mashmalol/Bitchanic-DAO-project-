import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import playBeep from '../lib/sfx';

import corn from '../svgs/corn-svgrepo-com.svg';
import bag from '../svgs/farming-bag-wheat-svgrepo-com.svg';
import future from '../svgs/farming-future-of-farming-agriculture-svgrepo-com.svg';
import infoAg from '../svgs/farming-information-agriculture-svgrepo-com.svg';
import infoNet from '../svgs/farming-information-internet-svgrepo-com.svg';
import less from '../svgs/farming-less-agriculture-svgrepo-com.svg';
import science from '../svgs/farming-science-technology-svgrepo-com.svg';
import tractor from '../svgs/farming-tractor-control-svgrepo-com.svg';
import gm1 from '../svgs/gm-gmo-future-of-farming-svgrepo-com.svg';
import gm2 from '../svgs/gmo-future-of-farming-genetically-svgrepo-com.svg';
import harvest from '../svgs/harvest-svgrepo-com.svg';
import hydro from '../svgs/hydroponic-soilless-farm-svgrepo-com.svg';
import drone from '../svgs/survey-drone-future-of-farming-svgrepo-com.svg';

const svgs: { src: string; alt: string; label: string }[] = [
  { src: corn, alt: 'corn', label: 'Corn' },
  { src: bag, alt: 'bag of wheat', label: 'Wheat' },
  { src: future, alt: 'future of farming', label: 'Future' },
  { src: infoAg, alt: 'agriculture info', label: 'AgriInfo' },
  { src: infoNet, alt: 'internet info', label: 'NetInfo' },
  { src: less, alt: 'less agriculture', label: 'Minimal' },
  { src: science, alt: 'science and tech', label: 'TechFarm' },
  { src: tractor, alt: 'tractor', label: 'Tractor' },
  { src: gm1, alt: 'gmo future', label: 'GMO' },
  { src: gm2, alt: 'gmo genetics', label: 'Genetics' },
  { src: harvest, alt: 'harvest', label: 'Harvest' },
  { src: hydro, alt: 'hydroponic farm', label: 'Hydro' },
  { src: drone, alt: 'survey drone', label: 'Drone' },
];

export default function Landing() {
  const navigate = useNavigate();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const handleCardClick = (idx: number) => {
    try { playBeep({ freq: 880, duration: 0.08 }); } catch (e) { }
  };

  const handleCTA = (path: string) => {
    try { playBeep({ freq: 1000, duration: 0.1 }); } catch (e) { }
    navigate(path);
  };

  return (
    <div style={{ minHeight: '100vh', padding: '40px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(34, 139, 34, 0.1) 0%, rgba(0, 100, 0, 0.05) 100%)' }}>
      {/* Hero Section */}
      <div style={{ maxWidth: 1100, width: '100%', marginBottom: 60, textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Press Start 2P, monospace', fontSize: 40, marginBottom: 16, color: '#22dd22', textShadow: '0 0 10px rgba(34, 221, 34, 0.5)' }}>BITCHANIC</h1>
        <p style={{ fontFamily: 'Press Start 2P, monospace', fontSize: 14, color: '#aaffaa', marginBottom: 8 }}>Sustainable Farming Powered by Crypto</p>
        <p style={{ fontSize: 12, color: '#cccccc', marginBottom: 32, maxWidth: 600, margin: '8px auto 32px' }}>Discover the future of hydroponic farming with blockchain technology. Fresh produce, transparent supply chains, and rewarding token economics.</p>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
          <button
            onClick={() => handleCTA('/marketplace')}
            style={{
              fontFamily: 'Press Start 2P, monospace',
              fontSize: 12,
              padding: '12px 24px',
              background: '#00aa00',
              color: '#000',
              border: '2px solid #00ff00',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(0, 255, 0, 0.3)',
              transition: 'all 0.2s ease',
              fontWeight: 'bold',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.boxShadow = '0 8px 20px rgba(0, 255, 0, 0.6)';
              (e.target as HTMLButtonElement).style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.boxShadow = '0 4px 14px rgba(0, 255, 0, 0.3)';
              (e.target as HTMLButtonElement).style.transform = 'scale(1)';
            }}
          >
            SHOP NOW
          </button>
          <button
            onClick={() => handleCTA('/subscriptions')}
            style={{
              fontFamily: 'Press Start 2P, monospace',
              fontSize: 12,
              padding: '12px 24px',
              background: 'transparent',
              color: '#00ff00',
              border: '2px solid #00ff00',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(0, 255, 0, 0.2)',
              transition: 'all 0.2s ease',
              fontWeight: 'bold',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.background = '#00aa00';
              (e.target as HTMLButtonElement).style.color = '#000';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.background = 'transparent';
              (e.target as HTMLButtonElement).style.color = '#00ff00';
            }}
          >
            SUBSCRIBE
          </button>
        </div>
      </div>

      {/* SVG Gallery Grid */}
      <div style={{ maxWidth: 1100, width: '100%', marginBottom: 60 }}>
        <h2 style={{ fontFamily: 'Press Start 2P, monospace', textAlign: 'center', marginBottom: 32, color: '#22dd22', fontSize: 20 }}>PRODUCTS</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 20 }}>
          {svgs.map((s, i) => (
            <div
              key={i}
              onClick={() => handleCardClick(i)}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{
                textAlign: 'center',
                background: hoveredIdx === i ? 'rgba(0, 170, 0, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                padding: 16,
                borderRadius: 4,
                border: hoveredIdx === i ? '2px solid #00ff00' : '2px solid rgba(0, 170, 0, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                transform: hoveredIdx === i ? 'scale(1.08)' : 'scale(1)',
                boxShadow: hoveredIdx === i ? '0 0 12px rgba(0, 255, 0, 0.3)' : 'none',
              }}
            >
              <img
                src={s.src}
                alt={s.alt}
                style={{ width: 120, height: 120, objectFit: 'contain', imageRendering: 'pixelated', display: 'block', margin: '0 auto 8px' }}
              />
              <p style={{ fontFamily: 'Press Start 2P, monospace', fontSize: 11, color: hoveredIdx === i ? '#00ff00' : '#aaffaa', marginBottom: 4 }}>{s.label}</p>
              <p style={{ fontSize: 9, color: '#888888' }}>{s.alt}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div style={{ maxWidth: 1100, width: '100%', textAlign: 'center', paddingTop: 40, borderTop: '1px solid rgba(0, 170, 0, 0.2)' }}>
        <p style={{ fontFamily: 'Press Start 2P, monospace', fontSize: 12, color: '#22dd22', marginBottom: 8 }}>100% ORGANIC • ZERO WASTE • ECO-FRIENDLY</p>
        <p style={{ fontSize: 11, color: '#999999' }}>Powered by BCHN token • Smart contract verified</p>
      </div>
    </div>
  );
}
