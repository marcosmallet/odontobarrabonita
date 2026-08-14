import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

function value(name: string) {
  const prefix = `--${name}=`;
  const arg = process.argv.find((item) => item.startsWith(prefix));
  return arg?.slice(prefix.length);
}

async function main() {
  const slug = value("slug");
  const input = value("input");
  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error("Use --slug=slug-valido.");
  if (!input) throw new Error("Use --input=caminho-da-imagem.");
  const inputPath = path.resolve(input);
  if (!fs.existsSync(inputPath)) throw new Error(`Imagem não encontrada: ${inputPath}`);
  const outputPath = path.join(process.cwd(), "public", "images", "blog", `${slug}.webp`);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  await sharp(inputPath).resize({ width: 1600, height: 900, fit: "cover", position: "attention", withoutEnlargement: true }).webp({ quality: 82 }).toFile(outputPath);
  console.log(`Imagem otimizada: ${outputPath}`);
}

void main();
