import { getAllPosts } from "@/lib/blog";
import BlogIndex from "../../blog/BlogIndex";

export const metadata = {
  title: "Blog: Consejos sobre Canaletas, Sofito y Fascia",
  description:
    "Consejos expertos sobre instalación de canaletas (solo 6 y 7 pulgadas), reparación de sofito, reemplazo de fascia, drenaje, Peak 301 y mantenimiento del hogar, de los especialistas en aluminio de Tampa Bay.",
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
