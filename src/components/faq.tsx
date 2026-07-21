"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/site-data";

type FAQItem = (typeof faqs)[number];

export function FAQ({ items = faqs }: { items?: readonly FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-space bg-white">
      <div className="site-container grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
        <div>
          <p className="eyebrow">Dúvidas frequentes</p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-petroleum sm:text-4xl">
            Informação clara também faz parte do cuidado
          </h2>
          <p className="mt-5 leading-7 text-graphite/75">
            Reunimos respostas iniciais para ajudar você. Orientações específicas
            dependem de avaliação profissional.
          </p>
        </div>

        <div className="divide-y divide-line border-y border-line">
          {items.map((faq, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <div key={faq.question}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full cursor-pointer items-center justify-between gap-5 py-6 text-left font-display text-lg font-semibold text-petroleum focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-turquoise"
                  >
                    {faq.question}
                    <ChevronDown
                      className={`size-5 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="pb-6 pr-10 text-[0.95rem] leading-7 text-graphite/75"
                >
                  {faq.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
