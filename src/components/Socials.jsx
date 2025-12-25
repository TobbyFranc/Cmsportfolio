import React, { useEffect, useState } from "react";
import { client } from "../sanity/client";
import {
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa";

export default function Socials() {
  const [socials, setSocials] = useState([]);

  useEffect(() => {
    client
      .fetch(`*[_type == "socials"]{
        platform,
        url
      }`)
      .then((res) => setSocials(res));
  }, []);

  if (!socials.length) return null;

  // Map platform names to icons
  const getIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case "twitter":
        return <FaTwitter />;
      case "linkedin":
        return <FaLinkedin />;
      case "github":
        return <FaGithub />;
      case "instagram":
        return <FaInstagram />;
      case "facebook":
        return <FaFacebook />;
      case "youtube":
        return <FaYoutube />;
      default:
        return null;
    }
  };

  return (
    <div className="flex gap-4 mt-4">
      {socials.map((social, idx) => (
        <a
          key={idx}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-primary)] hover:opacity-80 text-2xl"
        >
          {getIcon(social.platform) || social.platform}
        </a>
      ))}
    </div>
  );
}
