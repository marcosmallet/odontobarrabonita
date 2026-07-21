"use client";

import type { AnchorHTMLAttributes } from "react";
import {
  trackConversion,
  type ConversionEventName,
  type ConversionEventParams,
} from "@/lib/analytics";

type ConversionLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  eventName?: ConversionEventName;
  eventParams?: ConversionEventParams;
};

export function ConversionLink({
  eventName,
  eventParams,
  onClick,
  ...props
}: ConversionLinkProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        if (eventName && eventParams) {
          trackConversion(eventName, eventParams);
        }
        onClick?.(event);
      }}
    />
  );
}

