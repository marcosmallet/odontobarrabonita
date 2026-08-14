import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { getDentalService, type DentalServiceId } from "@/lib/blog/services";
import { getDentist } from "@/lib/blog/authors";

function value(name: string) {
  const prefix = `--${name}=`;
  const arg = process.argv.find((item) => item.startsWith(prefix));
  return arg?.slice(prefix.length);
}

async function main() {
  const slug = value("slug");
  const serviceId = value("service") as DentalServiceId | undefined;
  const input = value("input");
  const reference = value("reference");
  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error("Use --slug=slug-valido.");
  if (!serviceId || !getDentalService(serviceId)) throw new Error("Use --service=servico-do-catalogo.");
  if (!input) throw new Error("Use --input=caminho-da-imagem-gerada.");
  const service = getDentalService(serviceId)!;
  const professional = getDentist(service.professionalId);
  if (!professional) throw new Error(`Profissional não encontrado para o serviço: ${serviceId}.`);
  const officialReferencePath = path.resolve(process.cwd(), "public", professional.photoPath.replace(/^\//, ""));
  if (!reference || path.resolve(reference) !== officialReferencePath) {
    throw new Error(`Use --reference=${officialReferencePath} para gerar a cena com ${professional.shortName}.`);
  }
  const inputPath = path.resolve(input);
  if (!fs.existsSync(inputPath)) throw new Error(`Imagem gerada não encontrada: ${inputPath}`);
  if (!fs.existsSync(officialReferencePath)) throw new Error(`Foto oficial de referência não encontrada: ${officialReferencePath}`);
  const outputPath = path.join(process.cwd(), "public", "images", "blog", `${slug}.webp`);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  await sharp(inputPath).resize({ width: 1600, height: 900, fit: "cover", position: "attention", withoutEnlargement: true }).webp({ quality: 82 }).toFile(outputPath);
  console.log(`Cena de atendimento com ${professional.shortName} otimizada: ${outputPath}`);
}

void main();
