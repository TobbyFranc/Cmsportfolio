export default {
  name: "social",
  title: "Social Links",
  type: "document",
  fields: [
    { name: "platform", title: "Platform", type: "string" },
    { name: "url", title: "URL", type: "url" },
    { name: "icon", title: "Icon", type: "string" }, // e.g. "twitter", "github"
  ],
};
