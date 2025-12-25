import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { FaVideo, FaPenFancy, FaPaintBrush } from "react-icons/fa";

import Toonme from "../assets/Toonme.png";
import Knowme from "../assets/knowme.png";
import HeroImg from "../assets/HeroImg.png";

export default function AboutMeStickyScroll() {
  const sections = [
    {
      title: "Blogging Insights",
      description:
        "Through writing, I share ideas on design, code, and creativity. My blogs weave narratives that spark thought and encourage exploration.",
      icon: <FaPenFancy className="text-[var(--color-primary)] text-4xl" />,
      image: Toonme,
    },
    {
      title: "Vlogging Adventures",
      description:
        "Through video storytelling, I bring voices and concerns to life. My vlogs are a window into diverse experiences and everyday journeys that inspire connection.",
      icon: <FaVideo className="text-[var(--color-primary)] text-4xl" />,
      image: Knowme,
    },
    {
      title: "Artistic Expressions",
      description:
        "Colors, strokes, and imagination come together in my artistry. I paint emotions, blending traditional and digital mediums to tell visual stories.",
      icon: <FaPaintBrush className="text-[var(--color-primary)] text-4xl" />,
      image: HeroImg,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="aboutme" className="grid md:grid-cols-2 w-full">
      {/* Left side: scrolling text blocks centered */}
      <div className="flex flex-col">
        {sections.map((section, idx) => {
          const ref = useRef(null);
          const inView = useInView(ref, { amount: 0.5, once: false });

          // Update active index safely in an effect
          useEffect(() => {
            if (inView) setActiveIndex(idx);
          }, [inView, idx]);

          return (
            <motion.div
              ref={ref}
              key={idx}
              className="min-h-screen flex flex-col items-center justify-center px-12 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, amount: 0.5 }}
            >
              <h2 className="text-3xl font-bold flex items-center gap-3 mb-6">
                {section.icon} {section.title}
              </h2>
              <p className="text-lg opacity-80 max-w-md">{section.description}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Right side: sticky image crossfade */}
      <div className="sticky top-0 h-screen flex items-center justify-center relative overflow-hidden">
        {sections.map((section, idx) => (
          <motion.img
            key={idx}
            src={section.image}
            alt={section.title}
            className="absolute object-contain max-w-[70%] max-h-[70%] rounded-lg shadow-lg"
            animate={{ opacity: activeIndex === idx ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          />
        ))}
      </div>
    </section>
  );
}
