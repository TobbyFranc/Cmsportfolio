import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQAccordion({ faqs = [] }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (idx) => {
    setActiveIndex(activeIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 bg-[var(--color-muted)]/10">
      <h2 className="text-4xl font-bold text-center mb-16">FAQs</h2>
      <div className="max-w-3xl mx-auto space-y-6">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="border-b border-gray-300 dark:border-gray-600 pb-4"
          >
            <button
              onClick={() => toggleFAQ(idx)}
              className="w-full flex justify-between items-center text-left focus:outline-none"
            >
              <span className="text-lg font-semibold">{faq.question}</span>
              <span className="ml-4 text-xl">
                {activeIndex === idx ? "−" : "+"}
              </span>
            </button>
            <AnimatePresence>
                {activeIndex === idx && (
                  <motion.p
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    exit={{ opacity: 0, scaleY: 0 }}
                    transition={{ duration: 0.22 }}
                    style={{ transformOrigin: "top" }}
                    className="mt-3 text-gray-700 dark:text-gray-300 break-words whitespace-normal overflow-hidden"
                  >
                    {faq.answer}
                  </motion.p>
                )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
