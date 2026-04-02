export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/contractors/"],
      },
    ],
    sitemap: "https://jronegutters.com/sitemap.xml",
  };
}
