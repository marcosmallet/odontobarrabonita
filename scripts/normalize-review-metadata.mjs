import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const outputPath = path.join(process.cwd(), "out", "avaliar", "index.html");
const trailingSlashUrl = "https://odontobarrabonita.com.br/avaliar/";
const canonicalUrl = "https://odontobarrabonita.com.br/avaliar";

const html = await readFile(outputPath, "utf8");

if (!html.includes(trailingSlashUrl)) {
  throw new Error(`Expected review metadata URL was not found in ${outputPath}`);
}

await writeFile(outputPath, html.replaceAll(trailingSlashUrl, canonicalUrl), "utf8");
