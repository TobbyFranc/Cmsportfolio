import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Toonme from "../assets/Toonme.png";
import Knowme from "../assets/knowme.png";
import HeroImg from "../assets/HeroImg.png";

export default function AboutMeSplitScroll() {
  const sections = [
    {
      title: "Blogging Insights",
      description:
        "Through writing, I share ideas on design, code, and creativity. My blogs weave narratives that spark thought and encourage exploration.",
      image: Toonme,
    },
    {
      title: "Vlogging Adventures",
      description:
        "Through video storytelling, I bring voices and concerns to life. My vlogs are a window into diverse experiences and everyday journeys that inspire connection.",
      image: Knowme,
    },
    {
      title: "Artistic Expressions",
      description:
        "Colors, strokes, and imagination come together in my artistry. I paint emotions, blending traditional and digital mediums to tell visual stories.",
      image: HeroImg,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Create refs - MUST be called before any conditional returns
  const sectionRef1 = useRef(null);
  const sectionRef2 = useRef(null);
  const sectionRef3 = useRef(null);
  const sectionRefs = [sectionRef1, sectionRef2, sectionRef3];

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setWindowSize({ width, height });
      setIsMobile(width <= 767);
    };
    // Use requestAnimationFrame for better performance
    const handleResize = () => {
      requestAnimationFrame(checkMobile);
    };
    checkMobile(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Track mouse for parallax (desktop only)
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  // Track which section is in view (desktop only)
  useEffect(() => {
    if (isMobile) return;

    const observers = sectionRefs.map((ref, idx) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(idx);
          }
        },
        { threshold: 0.5 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return observer;
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [isMobile, sectionRefs]);

  // Don't render until we have window dimensions
  if (windowSize.width === 0) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (isMobile) {
    // Mobile: stacked layout
    return (
      <section className="px-6 py-12 space-y-12">
        {sections.map((section, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center"
          >
            <img
              src={section.image}
              alt={section.title}
              className="w-full max-w-md rounded-lg shadow-lg mb-6"
              loading="lazy"
            />
            <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
            <p className="text-lg opacity-80">{section.description}</p>
          </motion.div>
        ))}
      </section>
    );
  }

  // Desktop: sticky split scroll
  return (
    <section id="aboutme-split" className="grid md:grid-cols-2 w-full min-h-screen">
      {/* Left side: text blocks */}
      <div className="flex flex-col">
        {sections.map((section, idx) => (
          <motion.div
            ref={sectionRefs[idx]}
            key={idx}
            className="min-h-screen flex flex-col items-center justify-center px-12 text-center py-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6">{section.title}</h2>
            <p className="text-lg opacity-80 max-w-md">{section.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Right side: sticky image with parallax */}
      <div className="sticky top-0 h-screen flex items-center justify-center relative overflow-hidden">
        {sections.map((section, idx) => {
          const offsetX = windowSize.width > 0 ? (mousePos.x / windowSize.width - 0.5) * 10 : 0;
          const offsetY = windowSize.height > 0 ? (mousePos.y / windowSize.height - 0.5) * 10 : 0;

          return (
            <motion.img
              key={idx}
              src={section.image}
              alt={section.title}
              className="absolute w-full h-full object-cover rounded-lg shadow-lg"
              animate={{
                opacity: activeIndex === idx ? 1 : 0,
                scale: activeIndex === idx ? 1 : 0.95,
                y: activeIndex === idx ? offsetY : 30,
                x: activeIndex === idx ? offsetX : 0,
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              loading="lazy"
            />
          );
        })}
      </div>
    </section>
  );
}
