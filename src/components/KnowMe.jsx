import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { client } from "../sanity/client"; 
import { urlFor } from "../sanity/imageBuilder";
import crown from "../assets/crown.png";
import fallbackBg from "../assets/knowme.png"; 

export default function KnowMe() {
  const [data, setData] = useState(null);

  useEffect(() => {
    client
      .fetch(`*[_type == "knowMe"][0]{
        title,
        description,
        extra,
        buttonText,
        bgImage
      }`)
      .then((res) => setData(res));
  }, []);

  const bgImg = data?.bgImage
    ? urlFor(data.bgImage).width(1600).url()
    : fallbackBg;

  // Split title into words so we can decorate "Me" in the Headr for crown placement
  const words = data?.title
    ? data.title.split(" ")
    : ["Get", "To", "Know", "Me"];

  return (
    <section
      id="knowme"
      className={`
        relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-24
        bg-cover bg-center bg-no-repeat
        text-center font-sans text-(--color-text)
      `}
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-(--color-bg)/94 z-0" />

      {/* Wavy divider at top */}
      <div className="absolute -top-12 left-0 w-full leading-none">
        <svg
          viewBox="0 0 1440 120"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-28 fill-(--color-muted)/20"
          preserveAspectRatio="none"
        >
          <path d="M0,60 C360,0 720,120 1080,40 C1260,0 1440,80 1440,80 L1440,0 L0,0 Z" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-4xl">
        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-8 flex flex-wrap items-center justify-center gap-2"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {words.map((word, idx) =>
            word.toLowerCase() === "me" ? (
              <span key={idx} className="relative inline-block">
                {word.charAt(0).toUpperCase() + word.slice(1)}
                <motion.img
                  src={crown}
                  alt="Crown"
                  className="absolute -top-4 -right-4 w-8 h-6 md:w-10 md:h-8 md:-top-8 md:-right-6 rotate-20"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                />
              </span>
            ) : (
              <span key={idx}>
                {word.charAt(0).toUpperCase() + word.slice(1)}
              </span>
            )
          )}
        </motion.h2>

        <motion.div
          className="max-w-3xl leading-relaxed"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <p className="mb-6">
            {data?.description ||
              "This is where I share my story, inspirations, and journey."}
          </p>
          <p className="mb-6">
            {data?.extra ||
              "Discover more about my creative process and artistic vision."}
          </p>
          <motion.button
            className="px-6 py-2 bg-slate-500 cursor-pointer text-white rounded hover:bg-[var(--color-primary)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {data?.buttonText || "More About Me"}
          </motion.button>
        </motion.div>
      </div>

      {/* Brush-stroke divider at bottom */}
      <div className="absolute -bottom-12 left-0 w-full overflow-hidden leading-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          className="w-full h-28 fill-(--color-muted)/30"
          preserveAspectRatio="none"
        >
          <path d="M0,40 C200,120 400,0 720,80 C1040,160 1240,20 1440,100 L1440,0 L0,0 Z" />
        </svg>
      </div>
    </section>
  );
}
