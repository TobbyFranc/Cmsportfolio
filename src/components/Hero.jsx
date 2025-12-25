import React from "react";
import { motion } from "framer-motion";
import HeroImg from "../assets/HeroImg.png";

export default function Hero({ data }) {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen px-6 pt-0 pb-24 overflow-hidden flex flex-col justify-center"
    >
      {/* Sun beam - Desktop (top-left corner) */}
      <motion.div
        className="absolute top-12 left-2 hidden md:block pointer-events-none"
        style={{
          width: "160px",
          height: "220px",
          background:
            "radial-gradient(ellipse at top, rgba(255,255,200,0.5) 0%, transparent 80%)",
          filter: "blur(50px)",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* Sun beam - Mobile (top-right corner) */}
      <motion.div
        className="absolute top-0 right-2 md:hidden pointer-events-none"
        style={{
          width: "160px",
          height: "220px",
          background:
            "radial-gradient(ellipse at top, rgba(255,255,200,0.5) 0%, transparent 80%)",
          filter: "blur(50px)",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* Desktop Hero */}
      <div className="hidden w-full h-full md:flex items-center justify-center relative z-10">
        <motion.img
          src={HeroImg}
          alt="HeroImg"
          className="w-30 sm:w-40 md:w-64 scale-x-[-1] h-auto object-contain"
          initial={{ opacity: 0, filter: "brightness(0.8)" }}
          animate={{ opacity: 1, filter: "brightness(1.1)" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        <motion.div
          className="w-px h-40 bg-gray-300 mx-6"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.6 }}
        />

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-4xl font-bold mb-4 max-w-xl">
            {data?.headline || "Crafting Digital Experiences That Inspire"}
          </h1>
          <p className="md:text-md mb-4">
            {data?.subtext || "A blog on design, code, and creativity."}
          </p>
          <motion.button
            className="px-6 py-2 bg-slate-500 cursor-pointer text-white rounded hover:bg-[var(--color-primary)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {data?.buttonText || "Read Blogs"}
          </motion.button>
        </motion.div>
      </div>

      {/* Mobile Hero */}
      <div className="flex flex-col items-center md:hidden text-center relative z-10">
        <motion.img
          src={HeroImg}
          alt="Hero"
          className="w-56 h-auto object-contain mb-6"
          initial={{ opacity: 0, filter: "brightness(0.8)", y: -30 }}
          animate={{ opacity: 1, filter: "brightness(1.1)", y: 0 }}
          transition={{ duration: 1.2 }}
        />
        <motion.h1
          className="text-2xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {data?.headline || "Crafting Digital Experiences That Inspire"}
        </motion.h1>
        <motion.p
          className="text-sm mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {data?.subtext || "A blog on design, code, and creativity."}
        </motion.p>
        <motion.button
          className="px-6 py-2 bg-slate-500 cursor-pointer text-white rounded hover:bg-blue-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {data?.buttonText || "Read Blogs"}
        </motion.button>
      </div>

      {/* Brush-stroke divider */}
      <div className="absolute -bottom-12 left-0 w-full overflow-hidden leading-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          className="w-full h-28 fill-[var(--color-muted)]/30"
          preserveAspectRatio="none"
        >
          <path d="M0,40 C200,120 400,0 720,80 C1040,160 1240,20 1440,100 L1440,0 L0,0 Z" />
        </svg>
      </div>
    </section>
  );
}
