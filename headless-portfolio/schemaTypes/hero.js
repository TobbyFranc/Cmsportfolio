// sanity/schemas/hero.js
export default {
  name: "hero",
  title: "Hero Section",
  type: "document",
  fields: [
    // Text content
    { name: "headline", title: "Headline", type: "string" },
    { name: "subtext", title: "Subtext", type: "text" },
    { name: "personName", title: "Person name", type: "string", description: "Shown under the header on mobile" },

    // Button
    { name: "buttonText", title: "Button text", type: "string" },
    { name: "buttonUrl", title: "Button link (optional)", type: "url" },

    // Images
    {
      name: "desktopImage",
      title: "Desktop image (Toonme)",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "string" }],
      description: "Small image displayed on the left for desktop",
    },
    {
      name: "mobileImage",
      title: "Mobile image (hero.png)",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "string" }],
      description: "Image displayed above text on mobile",
    },

    // Presentation
    { name: "showDivider", title: "Show vertical divider", type: "boolean", initialValue: true },
    { name: "animateText", title: "Animate text in from divider", type: "boolean", initialValue: true },
  ],
};
