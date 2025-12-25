import React, { useEffect, useState } from "react";
import { client } from "../sanity/client";
import { urlFor } from "../sanity/imageBuilder";
import Socials from "./Socials";

export default function Contact() {
  const [data, setData] = useState(null);

  useEffect(() => {
    client
      .fetch(`*[_type == "contact"][0]{
        title,
        description,
        phone,
        email,
        address,
        image
      }`)
      .then((res) => setData(res));
  }, []);

  if (!data) return null;

  const bgImg = data?.image ? urlFor(data.image).width(1200).url() : "";

  return (
    <section
      id="contact"
      className="relative w-full  flex items-center justify-center px-6 py-16 font-sans text-[var(--color-text)]"
    >
      {/* Mobile background */}
      <div
        className="absolute inset-0 bg-cover bg-center md:hidden"
        style={{ backgroundImage: `url(${bgImg})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Card */}
      <div className="relative z-10 flex flex-col md:flex-row bg-[var(--color-bg)] rounded-lg shadow-lg overflow-hidden max-w-5xl w-full">
        {/* Image side (desktop only) */}
        {data.image && (
          <div className="hidden md:block md:w-1/2">
            <img
              src={bgImg}
              alt="Contact"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Details side */}
        <div className="flex-1 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">{data.title || "Contact Me"}</h2>
          <p className="mb-6">{data.description}</p>

          <ul className="space-y-3 mb-6">
            {data.phone && <li>📞 {data.phone}</li>}
            {data.email && <li>✉️ {data.email}</li>}
            {data.address && <li>📍 {data.address}</li>}
          </ul>

          {/* Socials */}
          <Socials />
        </div>
      </div>
    </section>
  );
}
