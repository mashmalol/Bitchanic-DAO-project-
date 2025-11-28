import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from './ui/card';

const testimonials = [
  {
    nameKey: 'testimonials.user1.name',
    roleKey: 'testimonials.user1.role',
    textKey: 'testimonials.user1.text',
    rating: 5,
    avatar: '👨‍🌾'
  },
  {
    nameKey: 'testimonials.user2.name',
    roleKey: 'testimonials.user2.role',
    textKey: 'testimonials.user2.text',
    rating: 5,
    avatar: '👩‍💼'
  },
  {
    nameKey: 'testimonials.user3.name',
    roleKey: 'testimonials.user3.role',
    textKey: 'testimonials.user3.text',
    rating: 4,
    avatar: '👨‍🔬'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function SocialProof() {
  const { t } = useTranslation();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl font-bold text-center text-green-900 mb-4">
          {t('testimonials.title', 'What Our Users Say')}
        </h2>
        <p className="text-center text-gray-600 mb-16">
          {t('testimonials.subtitle', 'Join thousands of happy farmers and customers')}
        </p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">
                    "{t(testimonial.textKey)}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{testimonial.avatar}</div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {t(testimonial.nameKey)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {t(testimonial.roleKey)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
