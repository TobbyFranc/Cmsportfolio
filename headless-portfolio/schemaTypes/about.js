export default {
  name: "about",
  title: "About Section",
  type: "document",
  fields: [
    { name: "bio", title: "Bio", type: "text" },
    { name: "profileImage", title: "Profile Image", type: "image" },
    { name: "skills", title: "Skills", type: "array", of: [{ type: "string" }] },
  ],
};
