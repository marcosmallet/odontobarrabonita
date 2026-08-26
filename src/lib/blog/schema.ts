import { z } from "zod";
import { blogCategories, type BlogCategoryId } from "./categories";
import { dentalServices, type DentalServiceId } from "./services";

const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;
const isoDateTimePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/;

function isValidCalendarDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

const isoDateValue = z.preprocess(
  (value) => value instanceof Date ? value.toISOString() : value,
  z.string().refine((value) => {
    if (isoDatePattern.test(value)) return isValidCalendarDate(value);
    if (!isoDateTimePattern.test(value) || !isValidCalendarDate(value.slice(0, 10))) return false;
    return !Number.isNaN(Date.parse(value));
  }, "Use uma data ISO YYYY-MM-DD ou um horário ISO-8601 com fuso."),
);

export const searchIntentSchema = z.enum(["informational", "commercial", "commercial-local"]);

const blogFrontmatterFields = {
  title: z.string().trim().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug deve usar lowercase e hífens."),
  description: z.string().trim().min(1).max(320),
  publishedAt: isoDateValue,
  updatedAt: isoDateValue.optional(),
  category: z.string().refine((value): value is BlogCategoryId => value in blogCategories, "Categoria inexistente."),
  service: z.string().refine((value): value is DentalServiceId => value in dentalServices, "Serviço inexistente."),
  searchIntent: searchIntentSchema,
  primaryQuery: z.string().trim().min(1),
  secondaryQueries: z.array(z.string().trim().min(1)).default([]),
  author: z.enum(["clinic", "carlos", "francisco", "marcia"]),
  featuredImage: z.string().regex(/^\/images\/blog\/[a-z0-9-]+\.(?:webp|avif)$/),
  featuredImageAlt: z.string().trim().min(8).max(180),
  relatedPosts: z.array(z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)).default([]),
  faq: z.array(z.object({ question: z.string().trim().min(1), answer: z.string().trim().min(1) })).default([]),
  references: z.array(z.object({
    title: z.string().trim().min(1),
    publisher: z.string().trim().min(1),
    url: z.string().url().refine((value) => value.startsWith("https://"), "Referência deve usar HTTPS."),
  })).default([]),
};

export const blogFrontmatterSchema = z.strictObject(blogFrontmatterFields).superRefine((value, context) => {
  if (!value.updatedAt) return;
  const publishedTimestamp = Date.parse(value.publishedAt);
  const updatedTimestamp = Date.parse(value.updatedAt);
  if (updatedTimestamp < publishedTimestamp) {
    context.addIssue({
      code: "custom",
      path: ["updatedAt"],
      message: "updatedAt não pode ser anterior a publishedAt.",
    });
  }
});

export type BlogFrontmatter = z.infer<typeof blogFrontmatterSchema>;
export type SearchIntent = z.infer<typeof searchIntentSchema>;

export type BlogPost = BlogFrontmatter & {
  content: string;
  sourcePath: string;
  isFixture: boolean;
  readingTimeMinutes: number;
};
