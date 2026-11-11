import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, type FormEvent } from "react";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { z } from "zod";
import { COMPANY, SERVICES, waLink } from "@/lib/site";
import { PageIntro, seoHead } from "@/components/site/PageIntro";

export const Route = createFileRoute("/contact")({
  validateSearch: (s: Record<string, unknown>): { service?: string | undefined } => ({ service: typeof s["service"] === "string" ? s["service"] : undefined }),
  head: () => seoHead("Contact & Request a Quote | Charos Services Limited", `Request a quote for facilities management, maintenance, joinery, grounds or labour supply across ${COMPANY.area} via WhatsApp or phone.`, "/contact"),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z.string().trim().min(7, "Please enter a contact number").max(30),
  email: z.string().trim().email("Please enter a valid email").max(255).or(z.literal("")),
  audience: z.enum(["Domestic (home / rental)", "Commercial / facilities contract"]),
  service: z.string().min(1, "Please choose a service"),
  location: z.string().trim().max(100),
  timing: z.string().max(50),
  details: z.string().trim().min(10, "Please describe the work (10+ characters)").max(1500),
});

export function buildQuoteMessage(d: z.infer<typeof schema>) {
  return [
    "Hello Charos Services, I'd like to request a quote.",
    "",
    `Name: ${d.name}`,
    `Phone: ${d.phone}`,
    d.email && `Email: ${d.email}`,
    `Client type: ${d.audience}`,
    `Service: ${d.service}`,
    d.location && `Location / postcode: ${d.location}`,
    d.timing && `Timing: ${d.timing}`,
    "",
    `Details: ${d.details}`,
  ].filter((l): l is string => typeof l === "string").join("\n");
}

const field = "mt-1.5 w-full rounded-sm border border-input bg-card px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring";

function Contact() {
  const { service } = Route.useSearch();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[String(i.path[0])] ||= i.message));
      setErrors(errs);
      const n = Object.keys(errs).length;
      setStatus(`${n} ${n === 1 ? "field needs" : "fields need"} attention.`);
      const first = parsed.error.issues[0]?.path[0];
      if (first) formRef.current?.querySelector<HTMLElement>(`[name="${String(first)}"]`)?.focus();
      return;
    }
    setErrors({});
    setStatus("Opening WhatsApp in a new tab with your quote request.");
    window.open(waLink(buildQuoteMessage(parsed.data)), "_blank", "noopener,noreferrer");
  }

  const err = (k: string) => errors[k] && <p id={`${k}-error`} className="mt-1 text-xs text-destructive">{errors[k]}</p>;
  const a11y = (k: string) => (errors[k] ? { "aria-invalid": true, "aria-describedby": `${k}-error` } : {});

  return (
    <>
      <PageIntro eyebrow="Contact & quotes" title="Tell us what you need. We'll come back fast." text="Send your quote request to our team on WhatsApp — or call if you prefer." />
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-3">
        <aside className="space-y-4" aria-label="Other ways to contact us">
          <a href={waLink("Hello Charos Services, I have an enquiry.")} target="_blank" rel="noopener noreferrer" className="flex gap-4 border border-border bg-card p-5 hover:border-whatsapp">
            <MessageCircle className="h-6 w-6 text-whatsapp" aria-hidden="true" /><span><span className="block font-bold">WhatsApp</span><span className="text-sm text-muted-foreground">Fastest way to reach us</span><span className="sr-only"> (opens in a new tab)</span></span>
          </a>
          <a href={COMPANY.phoneHref} className="flex gap-4 border border-border bg-card p-5 hover:border-primary">
            <Phone className="h-6 w-6 text-primary" aria-hidden="true" /><span><span className="block font-bold">Call us</span><span className="text-sm text-muted-foreground">{COMPANY.phoneDisplay}</span></span>
          </a>
          {COMPANY.email && <a href={`mailto:${COMPANY.email}`} className="flex gap-4 border border-border bg-card p-5 hover:border-primary">
            <Mail className="h-6 w-6 text-primary" aria-hidden="true" /><span><span className="block font-bold">Email</span><span className="text-sm text-muted-foreground">{COMPANY.email}</span></span>
          </a>}
          <p className="pt-2 text-sm text-muted-foreground">Serving homes, landlords and businesses across {COMPANY.area}.</p>
        </aside>

        <form ref={formRef} onSubmit={onSubmit} noValidate aria-labelledby="quote-heading" className="grid gap-5 border border-border bg-card p-6 sm:grid-cols-2 md:p-10 lg:col-span-2">
          <h2 id="quote-heading" className="text-2xl font-extrabold sm:col-span-2">Quote builder</h2>
          <p className="-mt-3 text-sm text-muted-foreground sm:col-span-2">Fields marked <span aria-hidden="true">*</span><span className="sr-only">with an asterisk</span> are required.</p>
          <p role="status" aria-live="polite" className="sr-only">{status}</p>
          <fieldset className="sm:col-span-2">
            <legend className="text-sm font-medium">I am a…</legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {["Domestic (home / rental)", "Commercial / facilities contract"].map((a, i) => (
                <label key={a} className="flex cursor-pointer items-center gap-3 rounded-sm border border-input p-3 text-sm has-[:checked]:border-primary has-[:checked]:bg-secondary">
                  <input type="radio" name="audience" value={a} defaultChecked={i === 0} className="accent-[var(--primary)]" /> {a}
                </label>
              ))}
            </div>
          </fieldset>
          <label className="text-sm font-medium">Full name *<input name="name" required {...a11y("name")} className={field} autoComplete="name" />{err("name")}</label>
          <label className="text-sm font-medium">Phone *<input name="phone" type="tel" required {...a11y("phone")} className={field} autoComplete="tel" />{err("phone")}</label>
          <label className="text-sm font-medium">Email<input name="email" type="email" {...a11y("email")} className={field} autoComplete="email" />{err("email")}</label>
          <label className="text-sm font-medium">Service *
            <select name="service" required {...a11y("service")} defaultValue={service ?? ""} className={field}>
              <option value="" disabled>Choose a service</option>
              {SERVICES.map((s) => <option key={s.slug}>{s.title}</option>)}
              <option>Multiple / not sure</option>
            </select>{err("service")}
          </label>
          <label className="text-sm font-medium">Location / postcode<input name="location" className={field} /></label>
          <label className="text-sm font-medium">When do you need it?
            <select name="timing" className={field} defaultValue="Flexible">
              <option>Urgent (within 48 hours)</option><option>This week</option><option>Within a month</option><option>Flexible</option><option>Ongoing contract</option>
            </select>
          </label>
          <label className="text-sm font-medium sm:col-span-2">Describe the work *<textarea name="details" rows={5} required {...a11y("details")} className={field} />{err("details")}</label>
          <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
            <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-sm bg-whatsapp px-6 py-3 font-semibold text-whatsapp-foreground hover:bg-whatsapp/90"><MessageCircle className="h-4 w-4" aria-hidden="true" /> Send quote request via WhatsApp<span className="sr-only"> (opens in a new tab)</span></button>
            <p className="text-xs text-muted-foreground">Opens WhatsApp with your details filled in — just press send. You can attach photos there.</p>
          </div>
        </form>
      </section>
    </>
  );
}
