import { rm } from "node:fs/promises";
import path from "node:path";

// Next 16 rejects an empty generateStaticParams() result for static exports.
// The route uses a build-only sentinel to satisfy that invariant; remove its
// generated files before the export is consumed or deployed.
const sentinelPath = path.join(process.cwd(), "out", "blog", "__empty");
if (process.env.BLOG_INCLUDE_FIXTURES !== "1") {
  await rm(sentinelPath, { recursive: true, force: true });
  await rm(path.join(process.cwd(), "out", "images", "blog", "fixture-blog.webp"), { force: true });
}
