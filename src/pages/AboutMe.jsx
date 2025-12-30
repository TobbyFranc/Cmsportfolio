import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaGlobe,
  FaPenFancy,
  FaCode,
  FaPaintBrush,
} from "react-icons/fa";
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
  faqs[]{question, answer},
  skills[]{title, icon},
  testimonials[]{name, role, quote}
}`;

export default function AboutMe() {
  const [data, setData] = useState(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const fallbackData = {
    introTitle: "About Me",
    introText:
      "I’m Tobi, a creative storyteller blending vlogging, blogging, and artistry. My journey is about capturing life’s moments, expressing emotions through art, and sharing ideas that inspire connection. Beyond my work, I’m passionate about hobbies that fuel my creativity and keep me grounded.",
    hobbies: [
      {
        title: "Music",
        description: "Exploring rhythms, melodies, and instruments that inspire creativity.",
        images: [{ asset: { url: Knowme } }],
      },
      {
        title: "Photography",
        description: "Capturing moments and perspectives through the lens.",
        images: [{ asset: { url: HeroImg } }],
      },
      {
        title: "Painting",
        description: "Expressing emotions with colors, strokes, and imagination.",
        images: [{ asset: { url: HeroMobile } }],
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
        description: "Through writing, I share ideas on design, code, and creativity.",
        media: { asset: { url: Toonme } },
      },
      {
        title: "Vlogging Adventures",
        description: "Through video storytelling, I bring voices and concerns to life.",
        media: { asset: { url: Knowme } },
      },
      {
        title: "Artistic Expressions",
        description: "Colors, strokes, and imagination come together in my artistry.",
        media: { asset: { url: HeroImg } },
      },
    ],
    faqs: [],
    skills: [
      { title: "Web Development", icon: "code" },
      { title: "Digital Art", icon: "paint" },
    ],
    testimonials: [
      {
        name: "Jane Doe",
        role: "Creative Director",
        quote: "Tobi’s creativity and storytelling skills are unmatched.",
      },
      {
        name: "Ayo B.",
        role: "Product Designer",
        quote: "Authentic voice, refined craft. His work connects and inspires.",
      },
    ],
  };

  useEffect(() => {
    client
      .fetch(query)
      .then((res) => setData(res || fallbackData))
      .catch(() => setData(fallbackData));
  }, []);

  if (!data) return null;

  const iconMap = {
    users: <FaUsers />,
    globe: <FaGlobe />,
    pen: <FaPenFancy />,
    code: <FaCode />,
    paint: <FaPaintBrush />,
  };

  const testimonials = data.testimonials || [];
  const nextTestimonial = () =>
    setTestimonialIndex((i) => (i + 1) % Math.max(testimonials.length, 1));
  const prevTestimonial = () =>
    setTestimonialIndex((i) =>
      (i - 1 + Math.max(testimonials.length, 1)) % Math.max(testimonials.length, 1)
    );

  return (
    <section id="aboutme" className="w-full font-sans text-[var(--color-text)]">
      {/* Intro Hero */}
      <motion.div
        className="min-h-[70vh] md:min-h-screen flex flex-col items-center justify-center px-8 text-center bg-gradient-to-b from-[var(--color-primary)]/10 to-transparent"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
          {data.introTitle}
        </h1>
        <p className="max-w-3xl text-lg leading-relaxed opacity-80">
          {data.introText}
        </p>
      </motion.div>

      {/* Timeline Journey (replaces card overload) */}
      <section className="py-20">
        <h2 className="text-3xl font-bold text-center mb-12">My Journey</h2>
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-1/2 -translate-x-1/2 h-full border-l-2 border-gray-300"></div>
          {data.hobbies.map((hobby, idx) => {
            const imgSrc =
              hobby.images?.[0]?.asset?.url ??
              (typeof hobby.images?.[0] === "string" ? hobby.images[0] : undefined);
            return (
              <motion.div
                key={idx}
                className={`mb-12 flex ${
                  idx % 2 === 0 ? "flex-row" : "flex-row-reverse"
                } items-center`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                viewport={{ once: true }}
              >
                <div className="w-1/2 px-6">
                  <h3 className="text-xl font-semibold mb-2">{hobby.title}</h3>
                  <p className="text-sm opacity-80">{hobby.description}</p>
                </div>
                <div className="w-1/2 flex justify-center">
                  {imgSrc && (
                    <img
                      src={imgSrc}
                      alt={hobby.title}
                      className="w-40 h-40 object-cover rounded-lg shadow-md"
                      loading="lazy"
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Impact & Reach (sleek, smaller) */}
      <div className="py-16 bg-[var(--color-muted)]/5">
        <h2 className="text-3xl font-bold text-center mb-12">Impact & Reach</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto px-6 text-center">
          {data.impactMetrics.map((metric, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col items-center justify-center p-6 rounded-xl shadow-md bg-white/80 dark:bg-[#1e1e1e]/80 hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-primary)] text-white text-xl mb-4">
                {iconMap[metric.icon] || <FaUsers />}
              </div>
              <span className="text-2xl font-bold tracking-tight">
                {metric.value.toLocaleString()}
              </span>
              <p className="text-sm mt-2 opacity-70">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Split Scroll Storytelling (smaller, fitted visuals) */}
      <AboutMeStickyScroll sections={data.splitSections} />

      {/* Skills & Tools */}
      <div className="py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Skills & Tools</h2>
        <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto px-6">
          {data.skills?.length ? (
            data.skills.map((skill, idx) => (
              <motion.div
                key={idx}
                className="flex items-center gap-3 px-5 py-3 rounded-lg shadow-sm bg-white/80 dark:bg-[#1e1e1e]/80"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="text-[var(--color-primary)] text-xl">
                  {iconMap[skill.icon] || <FaCode />}
                </span>
                <span className="text-base font-medium">{skill.title}</span>
              </motion.div>
            ))
          ) : (
            <p className="opacity-70 text-center">Skills will be updated soon.</p>
          )}
        </div>
      </div>

      {/* Testimonials Carousel */}
      <div className="py-20 bg-[var(--color-muted)]/5">
        <h2 className="text-3xl font-bold text-center mb-12">Testimonials</h2>
        <div className="max-w-3xl mx-auto px-6">
          {testimonials.length ? (
            <div className="relative">
              <motion.blockquote
                key={testimonialIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="p-6 rounded-xl bg-white/80 dark:bg-[#1e1e1e]/80 shadow-md text-center"
              >
                <p className="text-base opacity-90">
                  “{testimonials[testimonialIndex].quote}”
                </p>
                <footer className="mt-4 text-sm opacity-70">
                  — {testimonials[testimonialIndex].name},{" "}
                  {testimonials[testimonialIndex].role}
                </footer>
              </motion.blockquote>

              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  aria-label="Previous testimonial"
                  onClick={prevTestimonial}
                  className="px-3 py-1 rounded-md bg-white/80 dark:bg-[#1e1e1e]/80 shadow hover:shadow-md transition"
                >
                  Prev
                </button>
                <button
                  aria-label="Next testimonial"
                  onClick={nextTestimonial}
                  className="px-3 py-1 rounded-md bg-white/80 dark:bg-[#1e1e1e]/80 shadow hover:shadow-md transition"
                >
                  Next
                </button>
              </div>
            </div>
          ) : (
            <p className="opacity-70 text-center">Testimonials will be added soon.</p>
          )}
        </div>
      </div>

      {/* FAQs (with permanent Contact question) */}
      <FAQAccordion faqs={data.faqs} />
    </section>
  );
}
