import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, CheckCircle2, Clock, Home as HomeIcon, MessageCircle, ShieldCheck, Users } from "lucide-react";
import hero from "@/assets/hero-facilities.jpg";
import propertySolutions from "@/assets/property-solutions.jpg";
import { COMPANY, SERVICES } from "@/lib/site";
import { WaButton } from "@/components/site/WhatsApp";
import { seoHead } from "@/components/site/PageIntro";

export const Route = createFileRoute("/")({
  head: () => seoHead("Charos Services Limited | Property Maintenance Birmingham, West Midlands & London", `Facilities management, building maintenance, joinery, grounds care and labour supply for businesses, landlords and homeowners across ${COMPANY.area}. Enquire on WhatsApp.`, "/"),
  component: Index,
});

const steps = [
  { n: "01", t: "Message us", d: "Tap a WhatsApp button — your service and property type are pre-filled." },
  { n: "02", t: "Share the details", d: "Send photos, location and timings. We ask only what we need." },
  { n: "03", t: "Receive your quote", d: "A clear, itemised quote — or a site visit for larger works." },
  { n: "04", t: "Work delivered", d: "Skilled operatives complete the job and we confirm sign-off with you." },
];

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-7 lg:pr-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Charos Services Limited | Property & Facilities Solutions</p>
            <h1 className="mt-5 text-5xl font-extrabold leading-[1.02] md:text-7xl">
              Keeping properties running. <span className="text-primary">Delivering quality.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              From facilities management and building maintenance to specialist trades and workforce supply, we help businesses and property owners maintain safe, functional, well-managed environments.
            </p>
            <p className="mt-4 text-sm font-semibold text-primary">Serving {COMPANY.area}.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <WaButton label="Get a quote on WhatsApp" />
              <Link to="/services" className="inline-flex items-center gap-2 rounded-sm border border-foreground px-5 py-3 text-sm font-semibold hover:bg-foreground hover:text-background">Explore our services <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground"><Clock className="h-4 w-4 text-primary" /> Quick replies during working hours — no forms, no waiting on hold.</p>

            {/* Dual audience */}
            <div className="mt-10 grid border border-border bg-card sm:grid-cols-2">
              <div className="border-b border-border p-6 sm:border-b-0 sm:border-r">
                <HomeIcon className="h-6 w-6 text-primary" />
                <h2 className="mt-3 text-lg font-bold">Homeowners & landlords</h2>
                <p className="mt-1 text-sm text-muted-foreground">Repairs, joinery, gardens and tenancy turnarounds — booked in a message.</p>
                <WaButton audience="domestic" label="Book a home job" className="mt-4 w-full" />
              </div>
              <div className="bg-ink p-6 text-ink-foreground">
                <Building2 className="h-6 w-6" />
                <h2 className="mt-3 text-lg font-bold">Commercial & facilities</h2>
                <p className="mt-1 text-sm text-ink-foreground/70">Maintenance contracts, multi-site support and labour supply.</p>
                <WaButton audience="commercial" label="Discuss a contract" variant="outline" className="mt-4 w-full" />
              </div>
            </div>
          </div>
          <div className="relative lg:col-span-5">
            <div className="absolute -left-4 top-8 hidden h-full w-full border-2 border-primary lg:block" aria-hidden />
            <img src={hero} alt="Illustrative facilities technician servicing ceiling ventilation in a commercial lobby" width={1280} height={1440} className="relative h-full max-h-[720px] w-full object-cover" />
          </div>
        </div>
        <div className="border-y border-border bg-secondary">
          <div className="mx-auto flex max-w-7xl flex-wrap gap-x-8 gap-y-2 px-6 py-4 text-sm font-semibold">
            {SERVICES.map((s) => <span key={s.slug} className="flex items-center gap-2"><span className="h-1.5 w-1.5 bg-primary" />{s.title}</span>)}
          </div>
        </div>
      </section>

      {/* Issue helper teaser */}
      <section className="border-b border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 py-10 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-extrabold">Not sure which service you need?</h2>
            <p className="mt-1 text-muted-foreground">Describe the problem and we'll suggest the right service and draft your WhatsApp message.</p>
          </div>
          <Link to="/issue-helper" className="inline-flex shrink-0 items-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Try the issue helper <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 lg:grid-cols-2">
        <img src={propertySolutions} alt="Illustrative mixed-use property with residential and office entrances and maintained grounds" width={1280} height={960} loading="lazy" className="aspect-[4/3] w-full object-cover" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Who we are</p>
          <h2 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">One trusted partner. Multiple property solutions.</h2>
          <p className="mt-6 text-lg text-muted-foreground">Charos Services Limited brings facilities management, property maintenance, specialist trades and workforce supply together under one roof. We take time to understand each client's requirements and deliver practical solutions tailored to their property and operations.</p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {["One point of contact", "Skilled, vetted operatives", "Clear quotes, no surprises", "Flexible scheduling"].map((x) => (
              <li key={x} className="flex items-center gap-2 font-medium"><CheckCircle2 className="h-5 w-5 text-primary" />{x}</li>
            ))}
          </ul>
          <Link to="/about" className="mt-8 inline-flex items-center gap-2 font-semibold text-primary hover:underline">More about Charos <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      {/* Services list */}
      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="max-w-2xl text-4xl font-extrabold md:text-5xl">Services, quoted in a message.</h2>
            <p className="max-w-sm text-ink-foreground/70">Pick a service below — we'll open WhatsApp with your enquiry already written.</p>
          </div>
          <div className="mt-12 divide-y divide-ink-foreground/15 border-y border-ink-foreground/15">
            {SERVICES.map((s, i) => (
              <div key={s.slug} className="grid items-center gap-4 py-7 md:grid-cols-12">
                <span className="font-display text-sm text-ink-foreground/50 md:col-span-1">0{i + 1}</span>
                <Link to="/services/$slug" params={{ slug: s.slug }} className="text-2xl font-bold hover:text-primary-foreground/80 md:col-span-4">{s.title}</Link>
                <p className="text-ink-foreground/70 md:col-span-4">{s.short}</p>
                <div className="flex gap-2 md:col-span-3 md:justify-end">
                  <WaButton service={s.title} label="Quick quote" className="px-4 py-2" />
                  <Link to="/services/$slug" params={{ slug: s.slug }} aria-label={`Learn more about ${s.title}`} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm border border-ink-foreground/30 px-3 hover:bg-ink-foreground/10"><ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Why clients choose Charos</p>
        <div className="mt-10 grid gap-px bg-border md:grid-cols-4">
          {[
            { i: MessageCircle, t: "Fast response", d: "Enquiries answered promptly on WhatsApp or phone." },
            { i: ShieldCheck, t: "Accountable delivery", d: "Clear scopes, agreed timings and sign-off on completion." },
            { i: Users, t: "Skilled personnel", d: "Experienced trades and operatives matched to each job." },
            { i: Building2, t: "Domestic to commercial", d: "Single homes through to multi-site facilities contracts." },
          ].map(({ i: Icon, t, d }) => (
            <div key={t} className="bg-background p-8">
              <Icon className="h-7 w-7 text-primary" />
              <h3 className="mt-5 text-xl font-bold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <h2 className="max-w-2xl text-4xl font-extrabold md:text-5xl">How an enquiry works</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="border-t-2 border-primary pt-5">
                <span className="font-display text-4xl font-extrabold text-primary">{s.n}</span>
                <h3 className="mt-3 text-lg font-bold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            <WaButton label="Start step one now" />
            <Link to="/contact" className="inline-flex items-center rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Prefer a detailed quote form?</Link>
          </div>
        </div>
      </section>
    </>
  );
}
