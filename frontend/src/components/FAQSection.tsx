import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const faqItems = [
  {
    questionKey: 'faq.q1.question',
    answerKey: 'faq.q1.answer',
  },
  {
    questionKey: 'faq.q2.question',
    answerKey: 'faq.q2.answer',
  },
  {
    questionKey: 'faq.q3.question',
    answerKey: 'faq.q3.answer',
  },
  {
    questionKey: 'faq.q4.question',
    answerKey: 'faq.q4.answer',
  },
  {
    questionKey: 'faq.q5.question',
    answerKey: 'faq.q5.answer',
  },
];

export default function FAQSection() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        <h2 className="text-4xl font-bold text-center text-green-900 mb-4">
          {t('faq.title', 'Frequently Asked Questions')}
        </h2>
        <p className="text-center text-gray-600 mb-12">
          {t('faq.subtitle', 'Get answers to common questions about Bitchanic')}
        </p>

        <div className="space-y-4">
          {faqItems.map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-green-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 text-left">
                  {t(item.questionKey)}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === idx ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-green-600 font-bold">▼</span>
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-200 bg-green-50"
                  >
                    <p className="px-6 py-4 text-gray-700">
                      {t(item.answerKey)}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
