import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { COMPANY, SERVICES } from "@/lib/site";
import { LOCATIONS, type Location } from "@/lib/locations";
import { PageIntro } from "./PageIntro";
import { WaButton } from "./WhatsApp";

export function LocationPage({ location }: { location: Location }) {
  return <>
    <PageIntro eyebrow={`Charos Services · ${location.name}`} title={`Property maintenance & facilities services in ${location.name}`} text={location.intro} />
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex flex-wrap items-center gap-4">
        <WaButton extra={`Property location: ${location.name}`} label={`Enquire about work in ${location.name}`} />
        <a href={COMPANY.phoneHref} className="font-semibold text-primary underline underline-offset-4">Call {COMPANY.phoneDisplay}</a>
      </div>
      <div className="mt-12 grid gap-10 md:grid-cols-2">
        <div><h2 className="text-2xl font-bold">Homes & rental properties</h2><p className="mt-4 text-muted-foreground">{location.domestic}</p><WaButton audience="domestic" extra={`Property location: ${location.name}`} label="Request a home or landlord quote" variant="outline" className="mt-6" /></div>
        <div><h2 className="text-2xl font-bold">Commercial premises & sites</h2><p className="mt-4 text-muted-foreground">{location.commercial}</p><WaButton audience="commercial" extra={`Site location: ${location.name}`} label="Discuss commercial work" variant="outline" className="mt-6" /></div>
      </div>
    </section>
    <section className="bg-secondary">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-3xl font-extrabold">Our services in {location.name}</h2>
        <ul className="mt-8 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(service => <li key={service.slug} className="border-t border-border pt-5">
            <h3 className="text-xl font-bold"><Link to="/services/$slug" params={{ slug: service.slug }} className="hover:underline">{service.title}<ArrowRight className="ml-2 inline h-4 w-4" aria-hidden="true" /></Link></h3>
            <p className="mt-3 text-sm text-muted-foreground">{service.short}</p>
            <WaButton service={service.title} extra={`Property location: ${location.name}`} label="Request a quote" variant="outline" className="mt-5" />
          </li>)}
        </ul>
      </div>
    </section>
    <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2">
      <div><h2 className="text-2xl font-bold">Planning your {location.name} enquiry</h2><p className="mt-4 text-muted-foreground">{location.planning}</p><p className="mt-4 text-muted-foreground">Send a description and photos of the issue, plus your preferred timing. We’ll discuss the requirements and next steps before work is agreed.</p></div>
      <div><h2 className="flex items-center gap-2 text-2xl font-bold"><MapPin className="h-5 w-5 text-primary" aria-hidden="true" />Service coverage</h2><p className="mt-4 text-muted-foreground">We serve {COMPANY.area}. {location.name} is a service area, not a separately advertised branch or walk-in office.</p><nav aria-label="Other service areas" className="mt-6 flex flex-wrap gap-5">{LOCATIONS.filter(area => area.slug !== location.slug).map(area => <Link key={area.slug} to="/$area" params={{ area: area.slug }} className="font-semibold text-primary underline underline-offset-4">{area.name}</Link>)}</nav></div>
    </section>
  </>;
}