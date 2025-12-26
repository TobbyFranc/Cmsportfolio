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

// GROQ query for the aboutMe document
const query = `*[_type == "aboutMe"][0]{
  introTitle,
  introText,
  hobbies[]{title, description, images[]{asset->{url}}},
  impactMetrics[]{label, value, icon},
  splitSections[]{title, description, media{asset->{url}}},
  faqs[]{question, answer}
}`;

export default function AboutMe() {
  const [data, setData] = useState(null);

  // Fallbacks
  const fallbackData = {
    introTitle: "About Me",
    introText:
      "I’m Tobi, a creative storyteller blending vlogging, blogging, and artistry. My journey is about capturing life’s moments, expressing emotions through art, and sharing ideas that inspire connection. Beyond my work, I’m passionate about hobbies that fuel my creativity and keep me grounded.",
    hobbies: [
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
    ],
    impactMetrics: [
      { label: "Subscribers", value: 12000, icon: "users" },
      { label: "Global Reach", value: 25, icon: "globe" },
      { label: "Projects Completed", value: 150, icon: "pen" },
    ],
    splitSections: [
      {
        title: "Blogging Insights",
        description:
          "Through writing, I share ideas on design, code, and creativity. My blogs weave narratives that spark thought and encourage exploration.",
        media: { asset: { url: Toonme } },
      },
      {
        title: "Vlogging Adventures",
        description:
          "Through video storytelling, I bring voices and concerns to life. My vlogs are a window into diverse experiences and everyday journeys that inspire connection.",
        media: { asset: { url: Knowme } },
      },
      {
        title: "Artistic Expressions",
        description:
          "Colors, strokes, and imagination come together in my artistry. I paint emotions, blending traditional and digital mediums to tell visual stories.",
        media: { asset: { url: HeroImg } },
      },
    ],
    faqs: [
      { question: "How can I contact you?", answer: "You can reach me via the Contact page." },
    ],
  };

  useEffect(() => {
    client
      .fetch(query)
      .then((res) => {
        setData(res || fallbackData);
      })
      .catch(() => setData(fallbackData));
  }, []);

  if (!data) return null;

  return (
    <section id="aboutme" className="w-full font-sans text-[var(--color-text)]">
      {/* Intro Section */}
      <motion.div
        className="min-h-screen flex flex-col items-center justify-center px-8 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-6xl font-extrabold mb-6 tracking-tight">
          {data.introTitle}
        </h1>
        <p className="max-w-3xl text-lg leading-relaxed opacity-80">
          {data.introText}
        </p>
      </motion.div>

      {/* Hobbies Section */}
      <div className="py-24 bg-gradient-to-b from-[var(--color-muted)]/10 to-transparent">
        <h2 className="text-4xl font-bold text-center mb-16">My Hobbies</h2>
        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto px-6">
          {data.hobbies.map((hobby, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col items-center justify-center cursor-pointer group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              viewport={{ once: false, amount: 0.5 }}
            >
              <p className="text-xl font-semibold mb-6">{hobby.title}</p>
              <div className="relative w-full h-64 flex items-center justify-center">
                {hobby.images.map((img, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-xl shadow-lg bg-white/70 backdrop-blur-sm p-1"
                    style={{
                      transform: `rotate(${i % 2 === 0 ? -3 + i * 2 : 3 - i * 2}deg) translateX(${i * 18}px)`,
                      zIndex: hobby.images.length - i,
                    }}
                    whileHover={{
                      y: -i * 12,
                      rotate: i % 2 === 0 ? -6 : 6,
                      x: i * 28,
                      scale: 1.05,
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    <img
                      src={typeof img === "string" ? img : img.asset?.url}
                      alt={`${hobby.title} ${i}`}
                      className="w-44 h-64 object-cover rounded-lg"
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </div>
              <p className="text-sm mt-6 opacity-80 text-center max-w-xs">
                {hobby.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Impact Metrics Section */}
      <div className="py-24">
        <h2 className="text-4xl font-bold text-center mb-16">Impact & Reach</h2>
        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto px-6 text-center">
          {data.impactMetrics.map((metric, idx) => {
            const iconMap = {
              users: <FaUsers />,
              globe: <FaGlobe />,
              pen: <FaPenFancy />,
            };
            return (
              <motion.div
                key={idx}
                className="flex flex-col items-center justify-center p-10 rounded-2xl shadow-lg bg-white/80 dark:bg-[#1e1e1e]/80 hover:scale-105 transition-transform duration-300"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                viewport={{ once: false, amount: 0.5 }}
              >
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[var(--color-primary)] text-white text-4xl mb-6">
                  {iconMap[metric.icon] || <FaUsers />}
                </div>
                <span className="text-5xl font-extrabold tracking-tight">
                  {metric.value.toLocaleString()}
                </span>
                <p className="text-lg mt-3 opacity-80">{metric.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Split Scroll Storytelling Section */}
      <AboutMeStickyScroll sections={data.splitSections} />

      {/* FAQS */}
      <FAQAccordion faqs={data.faqs} />
    </section>
  );
}
