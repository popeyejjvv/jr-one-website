import { getAllPosts } from "@/lib/blog";
import BlogIndex from "../../blog/BlogIndex";

export const metadata = {
  title: { absolute: "Blog de Canaletas, Sofito y Fascia | JR One Tampa Bay" },
  description:
    "Consejos de mantenimiento, señales de que necesita reemplazo y cómo elegir entre 6 y 7 pulgadas, escritos por los especialistas en aluminio de Tampa Bay.",
  alternates: {
    canonical: "https://www.jronegutters.com/es/blog",
    languages: {
      "en-US": "https://www.jronegutters.com/blog",
      "es-US": "https://www.jronegutters.com/es/blog",
      "x-default": "https://www.jronegutters.com/blog",
    },
  },
};

export default function EsBlogPage() {
  const posts = getAllPosts("es");
  return <BlogIndex posts={posts} />;
}
