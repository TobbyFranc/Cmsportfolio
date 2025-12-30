import React from "react";
import { motion } from "framer-motion";
import HeroImg from "../assets/HeroImg.png";

export default function Hero({ data }) {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full px-6 pb-24 flex items-center justify-center overflow-hidden"
    >
      {/* Sun Beam */}
      <motion.div
        className="absolute top-8 left-4 md:left-8 pointer-events-none"
        style={{
          width: "180px",
          height: "240px",
          background:
            "radial-gradient(ellipse at top, rgba(255,255,200,0.5) 0%, transparent 80%)",
          filter: "blur(50px)",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* Content */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-[auto_1px_1fr] gap-6 items-center max-w-5xl">
        {/* Image */}
        <motion.img
          src={HeroImg}
          alt="Illustration representing creativity and design"
          className="w-56 sm:w-64 md:w-72 object-contain scale-x-[-1] mx-auto"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        />

        {/* Divider (desktop only) */}
        <motion.div
          className="hidden md:block w-px h-40 bg-gray-300"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.6 }}
        />

        {/* Text */}
        <motion.div
          className="text-center md:text-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-2xl md:text-4xl font-bold mb-4 max-w-xl">
            {data?.headline || "Crafting Digital Experiences That Inspire"}
          </h1>

          <p className="text-sm md:text-md mb-6 text-muted-foreground">
            {data?.subtext || "A blog on design, code, and creativity."}
          </p>

          <motion.button
            aria-label="Read blog posts"
            className="px-6 py-2 rounded bg-slate-600 text-white hover:bg-[var(--color-primary)] transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {data?.buttonText || "Read Blogs"}
          </motion.button>
        </motion.div>
      </div>

      {/* Brush Divider */}
      <div className="absolute -bottom-12 left-0 w-full">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="w-full h-28 fill-[var(--color-muted)]/30"
        >
          <path d="M0,40 C200,120 400,0 720,80 C1040,160 1240,20 1440,100 L1440,0 L0,0 Z" />
        </svg>
      </div>
    </section>
  );
}
