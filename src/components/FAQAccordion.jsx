import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom"; 
import { client } from "../sanity/client";

const query = `*[_type == "faq"] | order(order asc){
  question,
  answer
}`;

const fallbackFaqs = [
  {
    question: "Who is Tobi?",
    answer:
      "I’m a creative storyteller blending vlogging, blogging, and artistry—capturing moments, painting emotions, and sharing ideas that spark connection.",
  },
  {
    question: "What kind of work do you do?",
    answer:
      "I create vlogs that highlight diverse experiences, write blogs that inspire thought, and make art that visually expresses emotions.",
  },
  {
    question: "What are your interests?",
    answer:
      "Music, photography, and painting. These keep me grounded and constantly fuel my creativity.",
  },
  {
    question: "Are you available for collaborations?",
    answer:
      "Yes—open to creative projects, storytelling initiatives, and artistic ventures with people who care about impact.",
  },
];

export default function FAQAccordion() {
  const [faqs, setFaqs] = useState(fallbackFaqs);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    let mounted = true;
    client
      .fetch(query)
      .then((res) => {
        if (!mounted) return;
        if (Array.isArray(res) && res.length > 0) setFaqs(res);
        else setFaqs(fallbackFaqs);
      })
      .catch(() => setFaqs(fallbackFaqs));
    return () => {
      mounted = false;
    };
  }, []);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-6 bg-[var(--color-muted)]/10">
      <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Dynamic FAQs from Sanity (or fallback) */}
        {faqs.map((faq, idx) => (
          <div key={idx} className="border-b border-gray-300 pb-4">
            <button
              onClick={() => toggleFAQ(idx)}
              className="w-full flex justify-between items-center text-left focus:outline-none"
            >
              <span className="text-lg font-semibold">{faq.question}</span>
              <span className="text-[var(--color-primary)] text-2xl">
                {activeIndex === idx ? "−" : "+"}
              </span>
            </button>
            <AnimatePresence>
              {activeIndex === idx && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-3 text-gray-700"
                >
                  <p className="text-md leading-relaxed">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {/* Always-present Contact FAQ */}
        <div className="border-b border-gray-300 pb-4">
          <button
            onClick={() => toggleFAQ("contact")}
            className="w-full flex justify-between items-center text-left focus:outline-none"
          >
            <span className="text-lg font-semibold">How can I contact you?</span>
            <span className="text-[var(--color-primary)] text-2xl">
              {activeIndex === "contact" ? "−" : "+"}
            </span>
          </button>
          <AnimatePresence>
            {activeIndex === "contact" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-3 text-gray-700"
              >
                <p className="text-md leading-relaxed">
                  You can reach me through the{" "}
                  <Link
                    to="/contact"
                    className="text-[var(--color-primary)] underline font-semibold"
                  >
                    Contact Page
                  </Link>{" "}
                  and let’s connect!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
