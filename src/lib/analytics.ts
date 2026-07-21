export type ConversionEventName =
  | "whatsapp_click"
  | "phone_click"
  | "directions_click";

export type ConversionEventParams = {
  cta_location: string;
  dentist_id?: string;
  service_name?: string;
  destination?: string;
};

declare global {
  interface Window {
    gtag?: (
      command: "event",
      eventName: ConversionEventName,
      params: ConversionEventParams,
    ) => void;
  }
}

export function trackConversion(
  eventName: ConversionEventName,
  params: ConversionEventParams,
) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", eventName, params);
}

