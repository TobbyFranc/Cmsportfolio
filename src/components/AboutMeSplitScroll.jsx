import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

export default function AboutMeStickyScroll({ sections = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 767 : true
  );

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    let id;
    const handleResize = () => {
      clearTimeout(id);
      id = setTimeout(() => setIsMobile(window.innerWidth <= 767), 150);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(id);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isMobile) {
    return (
      <section className="px-6 py-12 space-y-12">
        {sections.map((section, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center"
          >
            {section.media?.asset?.url && (
              <img
                src={section.media.asset.url}
                alt={section.title}
                className="w-full max-w-md rounded-lg shadow-lg mb-6 object-contain"
                loading="lazy"
              />
            )}
            <h3 className="text-2xl font-bold mb-4">{section.title}</h3>
            <p className="text-lg opacity-80">{section.description}</p>
          </motion.div>
        ))}
      </section>
    );
  }

  return (
    <section id="aboutme-split" className="grid md:grid-cols-2 w-full">
      {/* Left: text blocks */}
      <div className="flex flex-col">
        {sections.map((section, idx) => {
          const ref = useRef(null);
          const inView = useInView(ref, { amount: 0.5, once: false });

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
              transition={{ duration: 0.6 }}
              viewport={{ once: false, amount: 0.5 }}
            >
              <h3 className="text-3xl font-bold mb-6">{section.title}</h3>
              <p className="text-lg opacity-80 max-w-md">{section.description}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Right: sticky fitted image with subtle parallax */}
      <div className="sticky top-0 h-screen flex items-center justify-center relative overflow-hidden">
        {sections.map((section, idx) => {
          const offsetX = (mousePos.x / window.innerWidth - 0.5) * 12;
          const offsetY = (mousePos.y / window.innerHeight - 0.5) * 12;

          return (
            section.media?.asset?.url && (
              <motion.img
                key={idx}
                src={section.media.asset.url}
                alt={section.title}
                className="absolute rounded-lg shadow-lg object-contain"
                style={{ width: "60%", height: "60%" }}
                animate={{
                  opacity: activeIndex === idx ? 1 : 0,
                  scale: activeIndex === idx ? 1 : 0.97,
                  y: activeIndex === idx ? offsetY : 20,
                  x: activeIndex === idx ? offsetX : 0,
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                loading="lazy"
              />
            )
          );
        })}
      </div>
    </section>
  );
}
