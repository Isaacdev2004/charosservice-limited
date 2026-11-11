import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Building2, CheckCircle2, Home } from "lucide-react";
import { COMPANY, getService, SERVICES } from "@/lib/site";
import { seoHead } from "@/components/site/PageIntro";
import { WaButton } from "@/components/site/WhatsApp";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Service not found | Charos Services" }, { name: "robots", content: "noindex" }] };
    const s = loaderData.service;
    return {
      ...seoHead(`${s.title} | Charos Services Limited`, `${s.intro} Serving ${COMPANY.area}.`, `/services/${s.slug}`),
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.title,
          description: s.intro,
          serviceType: s.title,
          areaServed: COMPANY.serviceAreas.map((name) => ({ "@type": "Place", name })),
          provider: { "@type": "LocalBusiness", name: "Charos Services Limited" },
          hasOfferCatalog: { "@type": "OfferCatalog", name: s.title, itemListElement: s.includes.map((i) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: i } })) },
        }),
      }],
    };
  },
  component: ServicePage,
});

function ServicePage() {
  const { service: s } = Route.useLoaderData();
  return (
    <>
      <section className="grid lg:grid-cols-2">
        <div className="flex flex-col justify-center bg-secondary px-6 py-16 lg:px-16">
          <Link to="/services" className="text-xs font-semibold uppercase tracking-[0.2em] text-primary"><span aria-hidden="true">← </span>All services</Link>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-6xl">{s.title}</h1>
          <p className="mt-5 max-w-lg text-lg text-muted-foreground">{s.intro}</p>
          <p className="mt-4 text-sm text-muted-foreground">Serving {COMPANY.area}.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <WaButton service={s.title} label="Get a quote on WhatsApp" />
            <Link to="/contact" search={{ service: s.title }} className="inline-flex items-center rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Request a detailed quote</Link>
          </div>
        </div>
        <img src={s.image} alt={s.imageAlt} width={1280} height={960} className="h-full max-h-[560px] w-full object-cover" />
      </section>
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <h2 className="text-3xl font-extrabold">What's included</h2>
          <p className="mt-3 text-muted-foreground">Scope is always confirmed with you before work begins.</p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
          {s.includes.map((x) => <li key={x} className="flex gap-3 border border-border bg-card p-5 font-medium"><CheckCircle2 className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />{x}</li>)}
        </ul>
      </section>
      <section className="mx-auto grid max-w-7xl gap-px bg-border px-0 md:grid-cols-2">
        <div className="bg-background p-10">
          <Home className="h-7 w-7 text-primary" aria-hidden="true" />
          <h3 className="mt-4 text-2xl font-bold">For homeowners & landlords</h3>
          <p className="mt-2 text-muted-foreground">{s.domestic}</p>
          <WaButton service={s.title} audience="domestic" label="Book for my home" className="mt-6" />
        </div>
        <div className="bg-ink p-10 text-ink-foreground">
          <Building2 className="h-7 w-7" aria-hidden="true" />
          <h3 className="mt-4 text-2xl font-bold">For commercial clients</h3>
          <p className="mt-2 text-ink-foreground/70">{s.commercial}</p>
          <WaButton service={s.title} audience="commercial" label="Discuss a contract" variant="outline" className="mt-6" />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-2xl font-bold">Other services</h2>
        <nav aria-label="Other services" className="mt-6 flex flex-wrap gap-3">
          {SERVICES.filter((o) => o.slug !== s.slug).map((o) => (
            <Link key={o.slug} to="/services/$slug" params={{ slug: o.slug }} className="rounded-sm border border-border px-4 py-2 text-sm font-medium hover:border-primary hover:text-primary">{o.title}</Link>
          ))}
        </nav>
      </section>
    </>
  );
}
