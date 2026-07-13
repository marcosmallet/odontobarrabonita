"use client";

import { useEffect } from "react";

type GoogleReviewRedirectProps = {
  destination: string;
};

export function GoogleReviewRedirect({
  destination,
}: GoogleReviewRedirectProps) {
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      window.location.replace(destination);
    }, 1500);

    return () => window.clearTimeout(timeoutId);
  }, [destination]);

  return (
    <p
      className="mt-5 flex items-center justify-center gap-2 text-sm text-graphite/65"
      data-testid="review-redirect-status"
      role="status"
      aria-live="polite"
    >
      <span
        className="size-2.5 rounded-full bg-turquoise motion-safe:animate-pulse motion-reduce:animate-none"
        aria-hidden="true"
      />
      Redirecionando para o Google...
    </p>
  );
}
