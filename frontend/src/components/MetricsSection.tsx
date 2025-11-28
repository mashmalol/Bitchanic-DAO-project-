import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const metrics = [
  { icon: '👥', labelKey: 'metrics.users', value: 2500, suffix: '+' },
  { icon: '🌿', labelKey: 'metrics.products', value: 150, suffix: '+' },
  { icon: '🛒', labelKey: 'metrics.orders', value: 8500, suffix: '+' },
  { icon: '📈', labelKey: 'metrics.carbon', value: 1248, suffix: ' kg' },
];

const AnimatedCounter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const increment = value / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <>
      {count.toLocaleString()}
      {suffix}
    </>
  );
};

export default function MetricsSection() {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-green-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl font-bold text-center text-green-900 mb-4">
          {t('metrics.title', 'Growing Together')}
        </h2>
        <p className="text-center text-gray-600 mb-16">
          {t('metrics.subtitle', 'Real impact by the numbers')}
        </p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-4 gap-8"
        >
          {metrics.map((metric, idx) => {
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-center mb-4 text-4xl">
                  {metric.icon}
                </div>
                <p className="text-4xl font-bold text-green-900 mb-2">
                  <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                </p>
                <p className="text-gray-600 font-medium">
                  {t(metric.labelKey)}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
