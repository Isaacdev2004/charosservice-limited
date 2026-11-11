import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import logo from "@/assets/charos-logo.png";
import { COMPANY, SERVICES } from "@/lib/site";

const nav = [
  { to: "/issue-helper", label: "Issue Helper" },
  { to: "/about", label: "About Us" },
  { to: "/projects", label: "Projects" },
  { to: "/industries", label: "Industries" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="hidden bg-ink text-ink-foreground md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs">
          <span>Facilities management · Property maintenance · Workforce solutions — {COMPANY.area}</span>
          <a href={COMPANY.phoneHref} className="flex items-center gap-1.5 hover:underline"><Phone className="h-3 w-3" aria-hidden="true" /><span className="sr-only">Call us on </span>{COMPANY.phoneDisplay}</a>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link to="/" className="flex items-center" aria-label="Charos Services Limited home">
          <img src={logo} alt="" className="h-16 w-auto sm:h-20" />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 text-sm font-medium lg:flex">
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "text-primary" }}>Home</Link>
          <div className="group relative">
            <Link to="/services" activeProps={{ className: "text-primary" }} className="flex items-center gap-1" aria-haspopup="true">Services <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" /></Link>
            <div className="invisible absolute left-1/2 top-full w-80 -translate-x-1/2 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="border border-border bg-card p-2 shadow-xl" role="group" aria-label="Services">
                {SERVICES.map((s) => (
                  <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="block rounded-sm px-3 py-2.5 hover:bg-secondary">
                    <span className="block font-semibold">{s.title}</span>
                    <span className="block text-xs text-muted-foreground">{s.short}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {nav.map((n) => <Link key={n.to} to={n.to} activeProps={{ className: "text-primary" }}>{n.label}</Link>)}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/contact" className="hidden rounded-sm bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 sm:inline-flex">Request a Quote</Link>
          <button onClick={() => setOpen(!open)} className="p-2 lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu">
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      {open && (
        <div id="mobile-menu" className="border-t border-border bg-background px-6 pb-6 lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col py-2 text-base font-medium" onClick={() => setOpen(false)}>
            <Link to="/" className="py-3">Home</Link>
            <Link to="/services" className="py-3">Services</Link>
            {SERVICES.map((s) => <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="py-2 pl-4 text-sm text-muted-foreground">{s.title}</Link>)}
            {nav.map((n) => <Link key={n.to} to={n.to} className="py-3">{n.label}</Link>)}
          </nav>
          <div className="grid gap-2">
            <Link to="/contact" onClick={() => setOpen(false)} className="rounded-sm bg-primary py-3 text-center font-semibold text-primary-foreground">Request a Quote</Link>
            <a href={COMPANY.phoneHref} className="rounded-sm border border-border py-3 text-center font-semibold">Call Us</a>
          </div>
        </div>
      )}
    </header>
  );
}
