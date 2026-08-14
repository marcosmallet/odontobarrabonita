import type { DentalServiceId } from "@/lib/blog/services";

export type ConversionEventName =
  | "whatsapp_click"
  | "phone_click"
  | "directions_click"
  | "appointment_click";

export type DentalService = DentalServiceId | "geral";

export type DentistId = "carlos" | "francisco" | "marcia" | "clinic";

export type CtaLocation =
  | "header"
  | "hero"
  | "content"
  | "professional"
  | "services"
  | "floating"
  | "location"
  | "team_section"
  | "faq"
  | "footer"
  | "final_cta"
  | "blog_article";

export type CtaType =
  | "contact"
  | "appointment"
  | "directions"
  | "phone"
  | "information";

export type LeadSource =
  | "organic"
  | "google_ads"
  | "paid"
  | "direct"
  | "social"
  | "referral"
  | "email"
  | "other";

/**
 * The old fields remain accepted while existing reports migrate to the
 * canonical names. They are emitted as aliases by `trackConversion`.
 */
export type ConversionEventParams = {
  cta_location?: CtaLocation | string;
  cta_type?: CtaType;
  cta_text?: string;
  service?: DentalService;
  dentist?: DentistId;
  lead_source?: LeadSource;
  page_path?: string;
  page_title?: string;
  content_slug?: string;

  // Legacy parameters kept for compatibility with existing components and GA4 dimensions.
  dentist_id?: string;
  service_name?: string;
  destination?: string;
  contact_method?: "whatsapp" | "phone" | "maps";
};

export type LeadSourceInput = {
  href?: string;
  search?: string;
  referrer?: string;
};

const SESSION_LEAD_SOURCE_KEY = "bb_lead_source";

const SOCIAL_HOSTS = [
  "facebook.com",
  "instagram.com",
  "linkedin.com",
  "tiktok.com",
  "twitter.com",
  "x.com",
  "youtube.com",
];

const SEARCH_HOSTS = [
  "bing.com",
  "brave.com",
  "duckduckgo.com",
  "ecosia.org",
  "google.com",
  "search.yahoo.com",
  "yahoo.com",
];

const PAID_MEDIA = new Set([
  "cpc",
  "cpm",
  "cpv",
  "display",
  "paid",
  "paid_social",
  "social_ads",
  "social-ads",
  "ads",
  "advertising",
  "paidsearch",
  "ppc",
  "retargeting",
]);

const SOCIAL_MEDIA = new Set(["social", "social_paid", "social-organic"]);

const EMAIL_MEDIA = new Set(["email", "newsletter"]);

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: ConversionEventName,
      params: Record<string, string>,
    ) => void;
  }
}

function getHost(value: string | undefined): string | null {
  if (!value) return null;

  try {
    return new URL(value, "https://odontobarrabonita.com.br").hostname
      .toLowerCase()
      .replace(/^www\./, "");
  } catch {
    return null;
  }
}

function hostMatches(host: string | null, domains: string[]) {
  return Boolean(host && domains.some((domain) => host === domain || host.endsWith(`.${domain}`)));
}

function hasValue(value: string | null | undefined) {
  return Boolean(value && value.trim());
}

function getSearchParams(input: LeadSourceInput) {
  if (input.search !== undefined) return new URLSearchParams(input.search);

  if (!input.href) return new URLSearchParams();

  try {
    return new URL(input.href, "https://odontobarrabonita.com.br").searchParams;
  } catch {
    return new URLSearchParams();
  }
}

/** Pure, deterministic classification used by both runtime code and tests. */
export function classifyLeadSource(input: LeadSourceInput): LeadSource {
  const params = getSearchParams(input);
  const source = (params.get("utm_source") ?? "").trim().toLowerCase();
  const medium = (params.get("utm_medium") ?? "").trim().toLowerCase();
  const referrerHost = getHost(input.referrer);
  const hasAdIdentifier = ["gclid", "gbraid", "wbraid"].some((key) =>
    hasValue(params.get(key)),
  );
  const isGoogleSource = /(^|[._-])google($|[._-])/.test(source) || source === "adwords";
  const hasUtm = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].some(
    (key) => hasValue(params.get(key)),
  );

  if (hasAdIdentifier || (isGoogleSource && PAID_MEDIA.has(medium))) {
    return "google_ads";
  }

  if (PAID_MEDIA.has(medium)) return "paid";
  if (EMAIL_MEDIA.has(medium) || source === "email") return "email";
  if (
    SOCIAL_MEDIA.has(medium) ||
    hostMatches(source, SOCIAL_HOSTS) ||
    ["facebook", "instagram", "linkedin", "tiktok", "twitter", "x", "youtube"].includes(source)
  ) {
    return "social";
  }
  if (medium === "organic" || hostMatches(referrerHost, SEARCH_HOSTS)) return "organic";
  if (hasUtm) return "other";
  if (!referrerHost) return "direct";
  if (hostMatches(referrerHost, SOCIAL_HOSTS)) return "social";
  return "referral";
}

export function initializeLeadSource() {
  if (typeof window === "undefined") return;

  try {
    const stored = window.sessionStorage.getItem(SESSION_LEAD_SOURCE_KEY) as LeadSource | null;
    if (stored) return stored;

    const source = classifyLeadSource({
      href: window.location.href,
      referrer: document.referrer,
    });
    window.sessionStorage.setItem(SESSION_LEAD_SOURCE_KEY, source);
    return source;
  } catch {
    return classifyLeadSource({
      href: window.location.href,
      referrer: document.referrer,
    });
  }
}

function getLeadSource() {
  if (typeof window === "undefined") return "direct" as LeadSource;

  try {
    return (
      (window.sessionStorage.getItem(SESSION_LEAD_SOURCE_KEY) as LeadSource | null) ??
      initializeLeadSource() ??
      "direct"
    );
  } catch {
    return initializeLeadSource() ?? "direct";
  }
}

function normalizeService(value: string | undefined): DentalService {
  if (!value) return "geral";

  const normalized = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  if (normalized.includes("implante")) return "implante";
  if (normalized.includes("canal") || normalized.includes("endodont")) return "canal";
  if (normalized.includes("clareamento")) return "clareamento";
  if (normalized.includes("ortodont") || normalized.includes("aparelho")) return "ortodontia";
  if (normalized.includes("protese")) return "protese";
  if (normalized.includes("restaur")) return "restauracao";
  if (normalized.includes("limpeza") || normalized.includes("profilax")) return "limpeza";
  if (normalized.includes("alinhador")) return "alinhadores";
  if (normalized.includes("harmoniza")) return "harmonizacao";
  if (normalized.includes("toxina") || normalized.includes("botulin")) return "toxina";
  return "geral";
}

function normalizeDentist(value: string | undefined): DentistId {
  if (value === "carlos" || value === "francisco" || value === "marcia" || value === "clinic") {
    return value;
  }

  const normalized = value
    ?.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  if (normalized?.includes("carlos")) return "carlos";
  if (normalized?.includes("francisco")) return "francisco";
  if (normalized?.includes("marcia")) return "marcia";
  return "clinic";
}

function normalizeCtaLocation(value: string | undefined): CtaLocation {
  switch (value) {
    case "header":
    case "hero":
    case "content":
    case "professional":
    case "services":
    case "floating":
    case "location":
    case "team_section":
    case "faq":
    case "footer":
    case "final_cta":
    case "blog_article":
      return value;
    case "service_card":
      return "services";
    case "professional_card":
      return "professional";
    case "floating_mobile":
      return "floating";
    case "location_section":
      return "location";
    case "introduction":
    case "after_treatment_explanation":
      return "content";
    default:
      return "content";
  }
}

function normalizeCtaText(value: string | undefined) {
  if (!value) return undefined;
  const text = value.replace(/\s+/g, " ").trim().slice(0, 100);
  return text || undefined;
}

function normalizeContentSlug(value: string | undefined) {
  if (!value) return undefined;
  const slug = value.toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 100);
  return slug || undefined;
}

function normalizeParams(
  eventName: ConversionEventName,
  params: ConversionEventParams,
): Record<string, string> {
  const service = params.service ?? normalizeService(params.service_name);
  const dentist = params.dentist ?? normalizeDentist(params.dentist_id);
  const ctaLocation = normalizeCtaLocation(params.cta_location);
  const ctaType =
    params.cta_type ??
    (eventName === "whatsapp_click" || eventName === "appointment_click"
      ? "appointment"
      : eventName === "phone_click"
        ? "phone"
        : "directions");
  const pagePath =
    params.page_path?.split(/[?#]/, 1)[0] ||
    (typeof window !== "undefined" ? window.location.pathname : "/");
  const pageTitle =
    params.page_title ||
    (typeof document !== "undefined" ? document.title : undefined);
  const payload: Record<string, string> = {
    lead_source: params.lead_source ?? getLeadSource(),
    service,
    dentist,
    page_path: pagePath || "/",
    cta_location: ctaLocation,
    cta_type: ctaType,
    service_name: params.service_name ?? service,
    dentist_id: params.dentist_id ?? dentist,
  };

  if (pageTitle) payload.page_title = pageTitle;
  const contentSlug = normalizeContentSlug(params.content_slug);
  if (contentSlug) payload.content_slug = contentSlug;
  const ctaText = normalizeCtaText(params.cta_text);
  if (ctaText) payload.cta_text = ctaText;
  if (params.destination) payload.destination = params.destination;
  if (params.contact_method) payload.contact_method = params.contact_method;
  return payload;
}

export function trackConversion(
  eventName: ConversionEventName,
  params: ConversionEventParams = {},
) {
  if (typeof window === "undefined") return;

  try {
    window.gtag?.("event", eventName, normalizeParams(eventName, params));
  } catch {
    // Analytics must never prevent the destination action from completing.
  }
}

export function trackWhatsappClick(params: ConversionEventParams = {}) {
  trackConversion("whatsapp_click", { cta_type: "appointment", ...params });
}

export function trackPhoneClick(params: ConversionEventParams = {}) {
  trackConversion("phone_click", { cta_type: "phone", ...params });
}

export function trackDirectionsClick(params: ConversionEventParams = {}) {
  trackConversion("directions_click", { cta_type: "directions", ...params });
}

export function trackAppointmentClick(params: ConversionEventParams = {}) {
  trackConversion("appointment_click", { cta_type: "appointment", ...params });
}
