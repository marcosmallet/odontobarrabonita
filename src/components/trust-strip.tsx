import {
  BadgeCheck,
  Building,
  HeartHandshake,
  MapPinned,
  Stethoscope,
} from "lucide-react";
import { trustItems } from "@/lib/site-data";

const icons = [BadgeCheck, HeartHandshake, Building, MapPinned, Stethoscope];

export function TrustStrip() {
  return (
    <section aria-labelledby="trust-title" className="relative z-10 -mt-12 pb-16">
      <div className="site-container">
        <h2 id="trust-title" className="sr-only">
          Diferenciais da clínica
        </h2>
        <div className="grid overflow-hidden rounded-[2rem] border border-line bg-white shadow-[0_20px_60px_rgba(15,83,78,0.08)] sm:grid-cols-2 lg:grid-cols-5">
          {trustItems.map((item, index) => {
            const Icon = icons[index];
            return (
              <article
                key={item.title}
                className="border-b border-line p-6 last:border-b-0 sm:even:border-l lg:border-b-0 lg:border-l lg:first:border-l-0"
              >
                <Icon className="size-6 text-turquoise-dark" aria-hidden="true" />
                <h3 className="mt-4 font-display font-semibold text-petroleum">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-graphite/70">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
