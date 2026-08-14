import createMDX from "@next/mdx";
import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  images: {
    unoptimized: true,
  },
};

const withMDX = createMDX({
  options: { remarkPlugins: ["remark-frontmatter", path.join(process.cwd(), "scripts", "remark-blog-safety.mjs")] },
});

export default withMDX(nextConfig);
