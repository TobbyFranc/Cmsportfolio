export default {
  name: "nav",
  title: "Navigation",
  type: "document",
  fields: [
    {
      name: "siteName",
      title: "Site Name",
      type: "string",
    },
    {
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "items",
      title: "Nav Items",
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
              description: "Route or URL (e.g. /about, #contact, https://twitter.com)",
            },
            { name: "order", title: "Order", type: "number" },
          ],
        },
      ],
    },
  ],
};
