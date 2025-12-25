import React, { useEffect, useState } from "react";
import { client } from "../sanity/client";
import Nav from "./Nav";
import Footer from "./Footer";

// Tghis Layout component fetches navigation and footer data from Sanity CMS

export default function Layout({ children }) {
  const [navData, setNavData] = useState(null);
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    // Initial fetch
    client
      .fetch(`*[_type == "nav" && _id == "nav"][0]{
        siteName,
        "logoUrl": logo.asset->url,
        items[] | order(order asc)
      }`)
      .then(setNavData);

    client
      .fetch(`*[_type == "footer" && _id == "footer"][0]{
        copyright,
        links,
        socials
      }`)
      .then(setFooterData);

    // Real-time subscription for Nav
    const navSub = client
      .listen(`*[_type == "nav" && _id == "nav"]`)
      .subscribe((update) => {
        if (update.result) setNavData(update.result);
      });

    // Real-time subscription for Footer
    const footerSub = client
      .listen(`*[_type == "footer" && _id == "footer"]`)
      .subscribe((update) => {
        if (update.result) setFooterData(update.result);
      });

    // Cleanup subscriptions
    return () => {
      navSub.unsubscribe();
      footerSub.unsubscribe();
    };
  }, []);

  return (
    <>
      {navData && <Nav data={navData} />}
      <main className="pt-20">{children}</main>
      {footerData && <Footer data={footerData} />}
    </>
  );
}
