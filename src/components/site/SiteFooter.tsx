import { Link } from "@tanstack/react-router";
import { COMPANY, SERVICES } from "@/lib/site";
import { LOCATIONS } from "@/lib/locations";
import { WaButton } from "./WhatsApp";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col justify-between gap-6 border-b border-ink-foreground/15 pb-12 md:flex-row md:items-end">
          <h2 className="max-w-xl text-3xl font-extrabold md:text-4xl">Need something maintained, fixed or staffed? Tell us on WhatsApp.</h2>
          <WaButton label="Start a WhatsApp enquiry" />
        </div>
        <div className="grid gap-10 pt-12 md:grid-cols-4">
          <div>
            <p className="font-display text-xl font-extrabold">CHAROS</p>
            <p className="text-sm text-ink-foreground/70">Services Limited</p>
            <p className="mt-4 text-sm text-ink-foreground/70">A dependable partner for facilities management, property maintenance and workforce solutions.</p>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-ink-foreground/50">Services</p>
            <ul className="space-y-2 text-sm">{SERVICES.map((s) => <li key={s.slug}><Link to="/services/$slug" params={{ slug: s.slug }} className="hover:underline">{s.title}</Link></li>)}</ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-ink-foreground/50">Company</p>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:underline">About Us</Link></li>
              <li><Link to="/projects" className="hover:underline">Projects</Link></li>
              <li><Link to="/industries" className="hover:underline">Industries</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact & Quotes</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-ink-foreground/50">Contact</p>
            <ul className="space-y-2 text-sm">
              <li><a href={COMPANY.phoneHref} className="hover:underline">{COMPANY.phoneDisplay}</a></li>
              {COMPANY.email && <li><a href={`mailto:${COMPANY.email}`} className="hover:underline">{COMPANY.email}</a></li>}
              <li className="text-ink-foreground/70">{COMPANY.area}</li>
            </ul>
            <nav aria-label="Service areas" className="mt-5">
              <ul className="space-y-2 text-sm">{LOCATIONS.map(area => <li key={area.slug}><Link to="/$area" params={{ area: area.slug }} className="hover:underline">Services in {area.name}</Link></li>)}</ul>
            </nav>
          </div>
        </div>
        <p className="mt-12 text-xs text-ink-foreground/50">© {new Date().getFullYear()} Charos Services Limited. Registered in England & Wales.</p>
      </div>
    </footer>
  );
}
