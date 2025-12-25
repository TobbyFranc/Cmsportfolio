export default {
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    {
      name: "copyright",
      title: "Copyright Text",
      type: "string",
    },
    {
      name: "links",
      title: "Footer Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            {
              name: "href",
              title: "Href",
              type: "string",
              description: "Route or URL (e.g. /privacy, /terms, https://twitter.com)",
            },
          ],
        },
      ],
    },
    {
      name: "socials",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "platform", title: "Platform", type: "string" }, // e.g. Twitter
            { name: "url", title: "URL", type: "url" },
            { name: "icon", title: "Icon", type: "string" }, // optional for react-icons
          ],
        },
      ],
    },
  ],
};
