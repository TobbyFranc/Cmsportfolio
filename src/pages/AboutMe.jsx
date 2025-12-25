import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { client } from "../sanity/client";

// Import fallback images
import Knowme from "../assets/knowme.png";
import Toonme from "../assets/Toonme.png";
import HeroMobile from "../assets/HeroMobile.png";
import HeroImg from "../assets/HeroImg.png";
import { FaMusic, FaCamera, FaPaintBrush, FaUsers, FaGlobe, FaPenFancy } from "react-icons/fa";
import AboutMeStickyScroll from "../components/AboutMeSplitScroll";

// CountUp component for animated numbers
const CountUp = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
};

// GROQ query: adjust fields to match your schema
// Suggested schema: type "hobby", fields: {title, description, images[]}
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

  useEffect(() => {
    let mounted = true;
    client
      .fetch(query)
      .then((res) => {
        if (!mounted) return;
        if (Array.isArray(res) && res.length > 0) {
          // Map Sanity data, fallback if no images
          const mapped = res.map((hobby, idx) => ({
            title: hobby.title || fallbackHobbies[idx]?.title,
            description: hobby.description || fallbackHobbies[idx]?.description,
            images:
              hobby.images?.map((img) => img.asset?.url) ||
              fallbackHobbies[idx]?.images,
          }));
          setHobbies(mapped);
        } else {
          setHobbies(fallbackHobbies);
        }
      })
      .catch(() => setHobbies(fallbackHobbies));
    return () => {
      mounted = false;
    };
  }, []);

  // Variants for count-up effect
  const countVariants = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      opacity: 1,
      transition: { delay: i * 0.3, duration: 0.8 },
    }),
  };

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

      {/* Hobbies Section */}
      <div className="py-20 bg-[var(--color-muted)]/10">
        <h2 className="text-3xl font-bold text-center mb-12">My Hobbies</h2>
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto px-6">
          {hobbies.map((hobby, idx) => (
            <motion.div
              key={idx}
              className="relative flex flex-col items-center justify-center p-6 rounded-lg shadow-lg bg-white/80 dark:bg-[#1e1e1e]/80 cursor-pointer group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              viewport={{ once: false, amount: 0.5 }}
            >
              {/* Title */}
              <p className="text-lg font-semibold mb-4">{hobby.title}</p>

              {/* Stack of cards */}
              <div className="relative w-full h-48 flex items-end justify-center">
                {hobby.images.map((img, i) => (
                  <motion.img
                    key={i}
                    src={img}
                    alt={`${hobby.title} ${i}`}
                    className="absolute w-40 h-28 object-cover rounded-lg shadow-md"
                    style={{ bottom: 0 }}
                    initial={{ y: 0, rotate: 0 }}
                    whileHover={{
                      y: -i * 20,
                      rotate: i % 2 === 0 ? -5 : 5,
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  />
                ))}
              </div>

              {/* Description */}
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
              initial="hidden"
              whileInView="visible"
              custom={idx}
              variants={countVariants}
              viewport={{ once: false, amount: 0.5 }}
            >
              <div className="text-[var(--color-primary)] text-5xl mb-4">{metric.icon}</div>
              <motion.span
                className="text-4xl font-bold"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <CountUp end={metric.value} />
              </motion.span>
              <p className="text-lg mt-2">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Split Scroll Storytelling Section */}
      <AboutMeStickyScroll />
    </section>
  );
}
