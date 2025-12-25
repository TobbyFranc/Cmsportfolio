import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUsers, FaGlobe, FaPenFancy } from "react-icons/fa";
import AboutMeStickyScroll from "../components/AboutMeSplitScroll";
import FAQAccordion from "../components/FAQAccordion";
import { client } from "../sanity/client";

// Fallback images
import Knowme from "../assets/knowme.png";
import Toonme from "../assets/Toonme.png";
import HeroMobile from "../assets/HeroMobile.png";
import HeroImg from "../assets/HeroImg.png";

const query = `*[_type == "hobby"] | order(order asc){
  title,
  description,
  images[]{asset->{url}}
}`;

const fallbackHobbies = [
  {
    title: "Music",
    description: "Exploring rhythms, melodies, and instruments that inspire creativity.",
    images: [Knowme, Toonme, HeroMobile],
  },
  {
    title: "Photography",
    description: "Capturing moments and perspectives through the lens.",
    images: [HeroImg, Toonme, Knowme],
  },
  {
    title: "Painting",
    description: "Expressing emotions with colors, strokes, and imagination.",
    images: [HeroMobile, HeroImg, Toonme],
  },
];

export default function AboutMe() {
  const [hobbies, setHobbies] = useState(fallbackHobbies);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    client
      .fetch(query)
      .then((res) => {
        if (Array.isArray(res) && res.length > 0) {
          const mapped = res.map((hobby, idx) => ({
            title: hobby.title || fallbackHobbies[idx]?.title,
            description: hobby.description || fallbackHobbies[idx]?.description,
            images:
              hobby.images?.map((img) => img.asset?.url) ||
              fallbackHobbies[idx]?.images,
          }));
          setHobbies(mapped);
        }
      })
      .catch(() => setHobbies(fallbackHobbies));
  }, []);

  return (
    <section id="aboutme" className="w-full font-sans text-[var(--color-text)]">
      {/* Intro Section */}
      <motion.div
        className="min-h-screen flex flex-col items-center justify-center px-8 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-extrabold mb-6">About Me</h1>
        <p className="max-w-3xl text-lg leading-relaxed opacity-80">
          I’m Tobi, a creative storyteller blending vlogging, blogging, and artistry. 
          My journey is about capturing life’s moments, expressing emotions through art, 
          and sharing ideas that inspire connection. Beyond my work, I’m passionate about 
          hobbies that fuel my creativity and keep me grounded.
        </p>
      </motion.div>

      {/* Hobbies Section with stacked photo cards */}
      <div className="py-20 bg-[var(--color-muted)]/10">
        <h2 className="text-3xl font-bold text-center mb-12">My Hobbies</h2>
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto px-6">
          {hobbies.map((hobby, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col items-center justify-center cursor-pointer group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              viewport={{ once: false, amount: 0.5 }}
              onClick={() => setExpandedIndex(expandedIndex === idx ? null : idx)} // tap-to-expand for mobile
            >
              <p className="text-lg font-semibold mb-4">{hobby.title}</p>

              {/* Tilted stack of cards */}
              <div className="relative w-full h-56 flex items-center justify-center">
                {hobby.images.map((img, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-lg shadow-lg bg-white p-1"
                    style={{
                      transform: `rotate(${i % 2 === 0 ? -4 + i * 2 : 4 - i * 2}deg) translateX(${i * 15}px)`,
                      zIndex: hobby.images.length - i,
                    }}
                    whileHover={{
                      y: -i * 10,
                      rotate: i % 2 === 0 ? -8 : 8,
                      x: i * 25,
                      scale: 1.05,
                    }}
                    animate={
                      expandedIndex === idx
                        ? { y: -i * 12, x: i * 25, scale: 1.05 }
                        : {}
                    }
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    <img
                      src={img}
                      alt={`${hobby.title} ${i}`}
                      className="w-40 h-56 object-cover rounded-md"
                      loading="lazy" // performance improvement
                    />
                  </motion.div>
                ))}
              </div>

              <p className="text-sm mt-6 opacity-80 text-center">{hobby.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Impact Metrics Section */}
      <div className="py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Impact & Reach</h2>
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto px-6 text-center">
          {[
            { icon: <FaUsers />, label: "Subscribers", value: 12000 },
            { icon: <FaGlobe />, label: "Global Reach", value: 25 },
            { icon: <FaPenFancy />, label: "Projects Completed", value: 150 },
          ].map((metric, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col items-center justify-center p-8 rounded-lg shadow-lg bg-white/80 dark:bg-[#1e1e1e]/80"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              viewport={{ once: false, amount: 0.5 }}
            >
              <div className="text-[var(--color-primary)] text-5xl mb-4">{metric.icon}</div>
              <span className="text-4xl font-bold">{metric.value.toLocaleString()}</span>
              <p className="text-lg mt-2">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Split Scroll Storytelling Section */}
      <AboutMeStickyScroll />

      {/* FAQS */}
      <FAQAccordion />
    </section>
  );
}
