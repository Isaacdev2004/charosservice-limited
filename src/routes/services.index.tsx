import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { COMPANY, SERVICES } from "@/lib/site";
import { PageIntro, seoHead } from "@/components/site/PageIntro";
import { WaButton } from "@/components/site/WhatsApp";

export const Route = createFileRoute("/services/")({
  head: () => seoHead("Our Services | Charos Services Limited", `Facilities management, building maintenance, joinery, grounds maintenance, labour supply and construction support across ${COMPANY.area}.`, "/services"),
  component: Services,
});

function Services() {
  return (
    <>
      <PageIntro eyebrow="Services" title="Everything your property needs, through one provider." text="Choose a service to see what's included, or send a quick WhatsApp quote request straight away." />
      <section className="mx-auto max-w-7xl space-y-20 px-6 py-20">
        {SERVICES.map((s, i) => (
          <article key={s.slug} aria-labelledby={`svc-${s.slug}`} className="grid items-center gap-10 lg:grid-cols-2">
            <img src={s.image} alt={s.imageAlt} loading="lazy" width={1280} height={960} className={`aspect-[4/3] w-full object-cover ${i % 2 ? "lg:order-2" : ""}`} />
            <div>
              <span className="font-display text-sm font-bold text-primary" aria-hidden="true">0{i + 1}</span>
              <h2 id={`svc-${s.slug}`} className="mt-2 text-3xl font-extrabold md:text-4xl">{s.title}</h2>
              <p className="mt-4 text-lg text-muted-foreground">{s.intro}</p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">{s.includes.slice(0, 4).map((x) => <li key={x} className="border-l-2 border-primary pl-3 text-sm">{x}</li>)}</ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <WaButton service={s.title} label="Quick WhatsApp quote" />
                <Link to="/services/$slug" params={{ slug: s.slug }} className="inline-flex items-center gap-2 rounded-sm border border-foreground px-5 py-3 text-sm font-semibold">Full details<span className="sr-only"> about {s.title}</span> <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
