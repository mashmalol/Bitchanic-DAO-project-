import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SocialProof from '../components/SocialProof';
import MetricsSection from '../components/MetricsSection';
import FAQSection from '../components/FAQSection';

const HeroSection = () => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto text-center"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-green-900 mb-6 leading-tight"
        >
          {t('landing.hero.title', 'Sustainable Farming')}
          <br />
          <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
            {t('landing.hero.subtitle', 'Powered by Crypto')}
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto"
        >
          {t('landing.hero.description', 'Fresh hydroponic produce delivered to your door. Every purchase plants a tree and powers sustainable farming.')}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Link
            to="/marketplace"
            className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-lg hover:shadow-lg hover:from-green-700 hover:to-green-600 transition-all duration-300 transform hover:scale-105"
          >
            {t('landing.hero.cta1', 'Start Shopping')}
          </Link>
          <button className="px-8 py-4 border-2 border-green-600 text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-all duration-300">
            {t('landing.hero.cta2', 'Learn More')}
          </button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="relative h-64 sm:h-80 rounded-2xl bg-gradient-to-br from-green-100 to-green-50 border-2 border-green-200 flex items-center justify-center overflow-hidden"
        >
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-8xl"
          >
            🌾
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-6 text-center"
        >
          <div>
            <p className="text-3xl font-bold text-green-900">100%</p>
            <p className="text-gray-600">{t('landing.features.feature1', 'Organic')}</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-green-900">⚡</p>
            <p className="text-gray-600">{t('landing.features.feature2', 'Zero Waste')}</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-green-900">🌍</p>
            <p className="text-gray-600">{t('landing.features.feature3', 'Eco-Friendly')}</p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const FeaturesSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      emoji: '💰',
      titleKey: 'landing.features.crypto',
      descKey: 'landing.features.cryptoDesc'
    },
    {
      emoji: '📦',
      titleKey: 'landing.features.delivery',
      descKey: 'landing.features.deliveryDesc'
    },
    {
      emoji: '🎁',
      titleKey: 'landing.features.loyalty',
      descKey: 'landing.features.loyaltyDesc'
    },
    {
      emoji: '🔍',
      titleKey: 'landing.features.transparency',
      descKey: 'landing.features.transparencyDesc'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl sm:text-5xl font-bold text-center text-green-900 mb-4">
          {t('landing.features.title', 'Why Choose Bitchanic?')}
        </h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          {t('landing.features.subtitle', 'Everything you need for sustainable, transparent farming and shopping')}
        </p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="p-8 bg-gradient-to-br from-green-50 to-white rounded-xl border border-green-200 hover:shadow-lg transition-shadow"
            >
              <div className="text-5xl mb-4">{feature.emoji}</div>
              <h3 className="text-2xl font-bold text-green-900 mb-3">
                {t(feature.titleKey)}
              </h3>
              <p className="text-gray-600">
                {t(feature.descKey)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default function Landing() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <FeaturesSection />
      <MetricsSection />
      <SocialProof />
      <FAQSection />
    </motion.div>
  );
}
