import { createClient } from "@sanity/client";

const isDev = import.meta.env.DEV;

export const client = createClient({
  projectId: "5u95fyl0",
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: false,
  fetch: (url, options) => {
    if (isDev) {
      const proxied = url.replace("https://5u95fyl0.api.sanity.io", "/sanity");
      return fetch(proxied, options);
    }
    return fetch(url, options);
  },
});
