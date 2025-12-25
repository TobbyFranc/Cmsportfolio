import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { client } from "../sanity/client";
import { urlFor } from "../sanity/imageBuilder";
import { FaVideo, FaPenFancy, FaPaintBrush, FaPlayCircle, FaCode } from "react-icons/fa";
import { FaC } from "react-icons/fa6";

export default function MyWork() {
  const [data, setData] = useState(null);

  useEffect(() => {
    client
      .fetch(`*[_type == "myWork"][0]{
        title,
        intro,
        projects[]{
          name,
          description,
          link,
          image,
          videoUrl,
          videoFile,
          icon
        }
      }`)
      .then((res) => setData(res));
  }, []);

  if (!data) return null;

  const getIcon = (icon) => {
    switch (icon) {
      case "video":
        return <FaVideo className="text-[var(--color-primary)] text-2xl" />;
      case "pen":
        return <FaPenFancy className="text-[var(--color-primary)] text-2xl" />;
      case "paint":
        return <FaPaintBrush className="text-[var(--color-primary)] text-2xl" />;
      case "doctor":
        return <FaUsers className="text-[var(--color-primary)] text-2xl" />;
      case "globe":
        return <FaGlobe className="text-[var(--color-primary)] text-2xl" />;
      case "music":
        return <FaMusic className="text-[var(--color-primary)] text-2xl" />;
      case "camera":
        return <FaCamera className="text-[var(--color-primary)] text-2xl" />;
      case "tech":
            <FaCode className="text-[var(--color-primary)] text-2xl" />;
      default:
        return <FaVideo className="text-[var(--color-primary)] text-2xl" />;
    }
  };

  const fallbackTexts = [
    {
      title: "Vlogging Adventures",
      description: "I capture everyday moments and turn them into stories that resonate with people everywhere. My vlogs are a window into diverse experiences and voices.",
      icon: "video",
    },
    {
      title: "Blogging Insights",
      description: "Through writing, I share ideas on design, code, and creativity. My blogs weave narratives that spark thought and encourage exploration.",
      icon: "pen",
    },
    {
      title: "Artistic Expressions",
      description: "Colors, strokes, and imagination come together in my artistry. I paint emotions, blending traditional and digital mediums to tell visual stories.",
      icon: "paint",
    },
  ];

  return (
    <section
      id="mywork"
      className="relative w-full min-h-screen px-6 py-24 font-sans text-[var(--color-text)] 
                 bg-gradient-to-br from-[var(--color-bg)] via-[var(--color-primary)]/10 to-[var(--color-bg)]"
    >
      <motion.h2
        className="text-3xl md:text-5xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {data?.title || "My Work"}
      </motion.h2>

      <motion.p
        className="max-w-3xl mx-auto mb-12 leading-relaxed text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        {data?.intro}
      </motion.p>

      <div className="flex flex-col gap-16 max-w-6xl mx-auto">
        {data.projects?.map((project, idx) => {
          const isEven = idx % 2 === 0;
          const fallback = fallbackTexts[idx] || fallbackTexts[0];

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className={`grid md:grid-cols-2 gap-8 items-center ${
                isEven ? "" : "md:grid-flow-col-dense"
              }`}
            >
              {/* Text side */}
              <motion.div
                className="flex flex-col gap-4 text-left"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <motion.span
                    whileHover={{
                      scale: 1.2,
                      textShadow: "0px 0px 8px var(--color-primary)",
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    {getIcon(project.icon || fallback.icon)}
                  </motion.span>
                  {project.name || fallback.title}
                </h3>
                <p className="text-sm opacity-80">
                  {project.description || fallback.description}
                </p>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[var(--color-primary)] hover:underline mt-2"
                  >
                    Visit {project.name} →
                  </a>
                )}
              </motion.div>

              {/* Media side */}
              <motion.div
                className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg group"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                {project.image ? (
                  <img
                    src={urlFor(project.image).width(1200).url()}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                ) : project.videoUrl ? (
                  <div className="relative w-full h-full">
                    <iframe
                      src={project.videoUrl}
                      title={project.name}
                      className="w-full h-full object-cover"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    {/* Overlay play button with fade-in */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <FaPlayCircle className="text-white text-6xl opacity-80" />
                    </motion.div>
                  </div>
                ) : project.videoFile ? (
                  <div className="relative w-full h-full">
                    <video
                      autoPlay
                      muted
                      controls
                      loop
                      className="w-full h-full object-cover"
                      src={urlFor(project.videoFile).url()}
                    />
                    {/* Overlay play button with fade-in */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <FaPlayCircle className="text-white text-6xl opacity-80" />
                    </motion.div>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[var(--color-muted)]/20">
                    {getIcon(fallback.icon)}
                  </div>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
