import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, UserRound } from "lucide-react";
import { PageIntro, seoHead } from "@/components/site/PageIntro";
import { WaButton } from "@/components/site/WhatsApp";
import { COMPANY_FACTS, QUALIFICATIONS, TEAM } from "@/lib/about";
import { COMPANY, SERVICES } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => seoHead("About Us | Charos Services Limited", `Learn about Charos Services Limited and our approach to facilities and property services across ${COMPANY.area}.`, "/about"),
  component: About,
});

const values = [
  ["Reliability", "We turn up when we say, and do what we agreed."],
  ["Quality workmanship", "Work finished properly, the first time."],
  ["Accountability", "Clear ownership from enquiry to sign-off."],
  ["Clear communication", "Updates in plain language, on the channel you prefer."],
];

function About() {
  return (
    <>
      <PageIntro eyebrow="About Charos" title="A dependable partner for facilities, property and workforce needs." text="We help businesses, property owners, organisations and households keep their environments safe, functional and well managed." />

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-3">
        <div className="space-y-5 text-lg text-muted-foreground lg:col-span-2">
          <p>Charos Services Limited provides property maintenance, facilities management, specialist trade and workforce supply solutions across {COMPANY.area}.</p>
          <p>Our offering means clients can access multiple services through one provider — less time coordinating contractors, and one accountable point of contact.</p>
          <p>Whether it's a single repair in a family home or ongoing maintenance across a commercial portfolio, we bring the same standard of care and professionalism.</p>
        </div>
        <aside aria-labelledby="facts-heading" className="border-l-2 border-primary pl-6">
          <h2 id="facts-heading" className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">At a glance</h2>
          <dl className="mt-4 space-y-4">
            {COMPANY_FACTS.map((f) => (
              <div key={f.label}><dt className="text-sm text-muted-foreground">{f.label}</dt><dd className="font-display text-xl font-bold">{f.value}</dd></div>
            ))}
            <div><dt className="text-sm text-muted-foreground">Services</dt><dd className="font-semibold">{SERVICES.length} disciplines under one provider</dd></div>
            <div><dt className="text-sm text-muted-foreground">Clients</dt><dd className="font-semibold">Homeowners, landlords and commercial organisations</dd></div>
          </dl>
        </aside>
      </section>

      {TEAM.length > 0 && (
        <section aria-labelledby="team-heading" className="bg-secondary">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <h2 id="team-heading" className="text-4xl font-extrabold">Our team</h2>
            <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {TEAM.map((m) => (
                <li key={m.name} className="bg-card p-6">
                  {m.photoUrl
                    ? <img src={m.photoUrl} alt={`${m.name}, ${m.role}`} loading="lazy" className="aspect-square w-full object-cover" />
                    : <div className="flex aspect-square w-full items-center justify-center bg-muted" aria-hidden="true"><UserRound className="h-16 w-16 text-muted-foreground" /></div>}
                  <h3 className="mt-5 text-xl font-bold">{m.name}</h3>
                  <p className="text-sm font-semibold text-primary">{m.role}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{m.bio}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section aria-labelledby="quals-heading" className="mx-auto max-w-7xl px-6 py-20">
        <h2 id="quals-heading" className="text-4xl font-extrabold">Qualifications & compliance</h2>
        {QUALIFICATIONS.length > 0 ? (
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {QUALIFICATIONS.map((q) => (
              <li key={q.title} className="flex gap-3 border border-border bg-card p-5">
                <BadgeCheck className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <span><span className="block font-semibold">{q.title}</span>{q.detail && <span className="text-sm text-muted-foreground">{q.detail}</span>}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Details of our insurance, trade qualifications and site cards are available on request for any quote or tender. <Link to="/contact" className="text-primary underline">Ask our team</Link>.
          </p>
        )}
      </section>

      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-4xl font-extrabold">What we stand for</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-4">
            {values.map(([t, d]) => <div key={t} className="border-t border-ink-foreground/30 pt-5"><h3 className="text-xl font-bold">{t}</h3><p className="mt-2 text-sm text-ink-foreground/70">{d}</p></div>)}
          </div>
          <WaButton label="Talk to our team" className="mt-12" />
        </div>
      </section>
    </>
  );
}
