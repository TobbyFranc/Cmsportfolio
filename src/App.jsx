import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

// const Hero = lazy(() => import("./components/Hero"));
const About = lazy(() => import("./pages/AboutMe"));
const Projects = lazy(() => import("./components/Projects"));
const Services = lazy(() => import("./components/Services"));
const Blog = lazy(() => import("./components/Blog"));
const Contact = lazy(() => import("./components/Contact"));
const Home = lazy(() => import("./pages/Home"));
const AboutMe = lazy(() => import("./pages/AboutMe"));

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<p className="mt-24 text-center p-8">Working on it...</p>}>
        <Routes>
          {/* <Route path="/" element={<Hero />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/aboutme" element={<AboutMe />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
