import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Nav({ data }) {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  // Apply theme on mount and whenever darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav
      className="fixed top-4 left-1/2 transform -translate-x-1/2 
                 max-w-5xl w-[90%] mx-auto px-6 py-3 
                 bg-white/70 dark:bg-[#1e1e1e]/70 
                 backdrop-blur-md rounded-2xl shadow-lg 
                 border border-white/20 dark:border-gray-700/30 
                 z-50 transition-colors duration-300"
    >
      <div className="flex justify-between items-center">
        {/* Logo + Site Name */}
        <div className="flex items-center space-x-2">
          {data?.logoUrl && (
            <img
              src={data.logoUrl}
              alt="Logo"
              className="w-8 h-8 object-contain"
            />
          )}
          <span className="text-xl font-bold text-primary">
            {data?.siteName}
          </span>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-8">
          {data?.items?.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className="text-gray-700 dark:text-gray-200 hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right-side buttons */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-gray-700 dark:text-gray-200 focus:outline-none transition-transform duration-300 hover:scale-110"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? (
              // Moon SVG
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21.75 15.5A9.75 9.75 0 0112.25 3a9.75 9.75 0 100 19.5 9.75 9.75 0 009.5-7z" />
              </svg>
            ) : (
              // Sun SVG
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 4.5a1 1 0 011-1h0a1 1 0 011 1v2a1 1 0 01-2 0v-2zm0 13a1 1 0 011-1h0a1 1 0 011 1v2a1 1 0 01-2 0v-2zm7.5-7.5a1 1 0 011-1h2a1 1 0 010 2h-2a1 1 0 01-1-1zm-15 0a1 1 0 011-1H6a1 1 0 010 2H4.5a1 1 0 01-1-1zm11.95 6.45a1 1 0 011.41 0l1.41 1.41a1 1 0 01-1.41 1.41l-1.41-1.41a1 1 0 010-1.41zm-9.9-9.9a1 1 0 011.41 0L7.37 6.46a1 1 0 01-1.41 1.41L4.55 6.46a1 1 0 010-1.41zm9.9-1.41a1 1 0 010 1.41L15.04 7.37a1 1 0 01-1.41-1.41l1.41-1.41a1 1 0 011.41 0zm-9.9 9.9a1 1 0 010 1.41L6.46 15.04a1 1 0 01-1.41-1.41l1.41-1.41a1 1 0 011.41 0zM12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 dark:text-gray-200 focus:outline-none ml-2 transition-transform duration-300 hover:scale-110"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              // Close (X) SVG
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Hamburger Menu SVG
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown with animation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          open ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        <ul
          className="flex flex-col bg-white/80 dark:bg-[#1e1e1e]/80 
                     backdrop-blur-md rounded-xl shadow-md px-6 py-4 space-y-4"
        >
          {data?.items?.map((item) => (
            <li key={item.href}>
              <Link
                to={item.href}
                className="block text-gray-700 dark:text-gray-200 hover:text-primary transition-colors"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
