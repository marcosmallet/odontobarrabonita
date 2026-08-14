import { MessageCircle } from "lucide-react";
import { ConversionLink } from "@/components/conversion-link";
import { getDentalService } from "@/lib/blog/services";
import { getDentist } from "@/lib/blog/authors";
import type { BlogPost } from "@/lib/blog/schema";
import { buildWhatsappUrl } from "@/lib/site-data";

export function BlogCTA({ post }: { post: BlogPost }) {
  const service = getDentalService(post.service)!;
  const dentist = getDentist(service.professionalId)!;
  const href = buildWhatsappUrl(dentist.phoneInternational, service.whatsappMessage);
  return (
    <section className="blog-cta mt-16 overflow-hidden rounded-[2rem] bg-petroleum px-6 py-10 text-white sm:px-10 sm:py-12" aria-labelledby="blog-cta-title">
      <div className="relative z-10 max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-turquoise-light">Clínica Barra Bonita</p>
        <h2 id="blog-cta-title" className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{service.ctaTitle}</h2>
        <p className="mt-4 max-w-xl leading-7 text-white/75">{service.ctaDescription}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <ConversionLink href={href} target="_blank" rel="noopener noreferrer" eventName="whatsapp_click" eventParams={{ service: post.service, dentist: service.professionalId, cta_location: "blog_article", cta_type: "appointment", cta_text: "Agendar uma avaliação", content_slug: post.slug, contact_method: "whatsapp" }} className="button-primary bg-white text-petroleum hover:bg-mist">
            <MessageCircle className="size-5" aria-hidden="true" /> Agendar uma avaliação
          </ConversionLink>
          <a href={service.landingPage} className="button-secondary border-white/30 bg-transparent text-white hover:border-white hover:bg-white/10">{service.ctaLinkLabel}</a>
        </div>
      </div>
    </section>
  );
}
