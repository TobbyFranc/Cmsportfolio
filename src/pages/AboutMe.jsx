import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { client } from "../sanity/client";

// Import fallback images
import Knowme from "../assets/knowme.png";
import Toonme from "../assets/Toonme.png";
import HeroMobile from "../assets/HeroMobile.png";
import HeroImg from "../assets/HeroImg.png";

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

export default function HobbiesStack() {
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

  return (
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
  );
}
