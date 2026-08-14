import { clinic, dentists, SITE_URL, type Dentist } from "@/lib/site-data";

export type BlogAuthorId = "clinic" | Dentist["id"];
type BlogAuthor = { id: BlogAuthorId; name: string; type: "Organization" | "Person"; url?: string; dentist?: Dentist };

const dentistAuthors = Object.fromEntries(dentists.map((dentist) => [dentist.id, {
  id: dentist.id,
  name: dentist.name,
  type: "Person" as const,
  dentist,
}])) as Record<Dentist["id"], BlogAuthor>;

export const blogAuthors: Record<BlogAuthorId, BlogAuthor> = {
  clinic: { id: "clinic", name: clinic.name, type: "Organization", url: `${SITE_URL}/` },
  ...dentistAuthors,
};

export function getBlogAuthor(id: BlogAuthorId) {
  return blogAuthors[id];
}

export function getDentist(id: Dentist["id"]) {
  return dentists.find((dentist) => dentist.id === id);
}
