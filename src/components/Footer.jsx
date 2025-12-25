import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer({ data }) {
  const [showTop, setShowTop] = useState(false);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTop(true);
      } else {
        setShowTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.footer
      id="footer"
      className="w-full bottom-0 bg-(--color-bg) border-t border-(--color-primary)/20 
                 py-6 px-6 text-center font-sans text-(--color-text) shrink-0 relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Copyright */}
        <p className="text-sm text-(--color-text) opacity-80">
          {data?.copyright || "© 2025 MySite. All rights reserved."}
        </p>

        {/* Footer Links */}
        <ul className="flex space-x-6">
          {data?.links?.map((link, idx) => (
            <li key={link.href || idx}>
              <Link
                to={link.href}
                className="text-(--color-text) opacity-80 hover:text-(--color-primary) transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Social Icons */}
        <div className="flex space-x-4">
          {data?.socials?.map((social, idx) => {
            const Icon =
              social.platform === "Twitter"
                ? FaTwitter
                : social.platform === "GitHub"
                ? FaGithub
                : social.platform === "LinkedIn"
                ? FaLinkedin
                : null;

            return (
              <a
                key={social.url || idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-(--color-text) opacity-80 hover:text-(--color-primary) transition-colors"
              >
                {Icon ? <Icon className="w-5 h-5" /> : social.platform}
              </a>
            );
          })}
        </div>
      </div>

      {/* Back to Top Button (appears only after scroll) */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 flex items-center justify-center p-2 bg-(--color-primary) text-white rounded-full shadow-lg hover:opacity-90 transition-colors"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline-block ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.footer>
  );
}
