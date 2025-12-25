export default {
  name: "project",
  title: "Projects",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "description", title: "Description", type: "text" },
    { name: "techStack", title: "Tech Stack", type: "array", of: [{ type: "string" }] },
    { name: "image", title: "Image", type: "image" },
    { name: "link", title: "Project Link", type: "url" },
  ],
};
