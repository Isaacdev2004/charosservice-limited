import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useRef, useState, type FormEvent } from "react";
import { Building2, Home, Loader2, MessageCircle, Sparkles } from "lucide-react";
import { recommendService, type AdvisorResult } from "@/lib/advisor.functions";
import { getService, waLink, type Audience } from "@/lib/site";
import { PageIntro, seoHead } from "@/components/site/PageIntro";

export const Route = createFileRoute("/issue-helper")({
  head: () => seoHead("Describe Your Property Issue | Charos Services Limited", "Tell us what's wrong and get an instant service suggestion plus a ready-to-send WhatsApp enquiry for Charos Services.", "/issue-helper"),
  component: IssueHelper,
});

const urgencyLabel = { urgent: "Sounds urgent", soon: "Worth sorting soon", planned: "Can be planned in" } as const;

function IssueHelper() {
  const ask = useServerFn(recommendService);
  const [audience, setAudience] = useState<Audience>("domestic");
  const [issue, setIssue] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<AdvisorResult | null>(null);
  const [message, setMessage] = useState("");
  const resultRef = useRef<HTMLHeadingElement>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (issue.trim().length < 10) { setError("Please describe the issue in a little more detail (10+ characters)."); return; }
    setLoading(true); setError(""); setResult(null);
    try {
      const res = await ask({ data: { audience, issue, ...(location.trim() ? { location } : {}) } });
      if (res.ok) {
        setResult(res.result); setMessage(res.result.whatsapp_message);
        setTimeout(() => resultRef.current?.focus(), 50);
      } else setError(res.error);
    } catch {
      setError("Something went wrong. Please try again or message us on WhatsApp directly.");
    } finally { setLoading(false); }
  }

  const primary = result ? getService(result.primary_service) : undefined;
  const field = "mt-1.5 w-full rounded-sm border border-input bg-card px-3 py-2.5 text-sm";

  return (
    <>
      <PageIntro eyebrow="Issue helper" title="Not sure which service you need?" text="Describe the problem in your own words. We'll suggest the right Charos service and write a WhatsApp enquiry you can edit and send." />
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-2">
        <form onSubmit={onSubmit} aria-labelledby="helper-heading" className="space-y-5 border border-border bg-card p-6 md:p-8">
          <h2 id="helper-heading" className="text-2xl font-extrabold">Tell us what's going on</h2>
          <fieldset>
            <legend className="text-sm font-medium">This is for…</legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {([["domestic", "My home or rental", Home], ["commercial", "A business or managed site", Building2]] as const).map(([v, l, Icon]) => (
                <label key={v} className="flex cursor-pointer items-center gap-3 rounded-sm border border-input p-3 text-sm has-[:checked]:border-primary has-[:checked]:bg-secondary">
                  <input type="radio" name="audience" value={v} checked={audience === v} onChange={() => setAudience(v)} className="accent-[var(--primary)]" />
                  <Icon className="h-4 w-4 text-primary" aria-hidden="true" /> {l}
                </label>
              ))}
            </div>
          </fieldset>
          <label className="block text-sm font-medium">Describe the issue *
            <textarea value={issue} onChange={(e) => setIssue(e.target.value)} rows={6} maxLength={1500} required
              aria-invalid={error && issue.trim().length < 10 ? true : undefined} aria-describedby="issue-hint"
              placeholder="e.g. The back garden is overgrown and a fence panel has blown down. I'm a landlord and new tenants move in next month."
              className={`${field} placeholder:text-muted-foreground`} />
            <span id="issue-hint" className="mt-1 block text-xs text-muted-foreground">Please don't include personal details like your full address. {issue.length}/1500</span>
          </label>
          <label className="block text-sm font-medium">Town or area (optional)
            <input value={location} onChange={(e) => setLocation(e.target.value)} maxLength={100} className={field} />
          </label>
          <button type="submit" disabled={loading} className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3 font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60">
            {loading ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Finding the right service…</> : <><Sparkles className="h-4 w-4" aria-hidden="true" /> Suggest a service</>}
          </button>
          <p className="text-xs text-muted-foreground">Suggestions are generated automatically and are a starting point — our team will confirm the scope with you.</p>
          <div role="status" aria-live="polite" className="text-sm">
            {loading && <span className="sr-only">Finding the right service.</span>}
            {error && <p className="text-destructive">{error}</p>}
          </div>
        </form>

        <div aria-live="polite">
          {!result && !loading && (
            <div className="flex h-full flex-col justify-center border border-dashed border-border p-8 text-muted-foreground">
              <p className="font-display text-lg font-bold text-foreground">Your suggestion will appear here.</p>
              <p className="mt-2 text-sm">Prefer to skip this? <Link to="/contact" className="text-primary underline">Use the quote form</Link> instead.</p>
            </div>
          )}
          {result && primary && (
            <div className="space-y-6">
              <div className="bg-ink p-8 text-ink-foreground">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-foreground/60">Recommended service · {urgencyLabel[result.urgency]}</p>
                <h2 ref={resultRef} tabIndex={-1} className="mt-3 text-3xl font-extrabold focus:outline-none">{primary.title}</h2>
                <p className="mt-3 text-ink-foreground/80">{result.reasoning}</p>
                <Link to="/services/$slug" params={{ slug: primary.slug }} className="mt-4 inline-block text-sm font-semibold underline">What's included in {primary.title}</Link>
                {result.secondary_services.length > 0 && (
                  <p className="mt-4 text-sm text-ink-foreground/70">May also involve: {result.secondary_services.map((s) => getService(s)?.title).filter(Boolean).join(", ")}</p>
                )}
              </div>
              {result.questions_to_expect.length > 0 && (
                <div>
                  <h3 className="font-bold">Helpful to have ready</h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">{result.questions_to_expect.map((q) => <li key={q}>{q}</li>)}</ul>
                </div>
              )}
              <div className="border border-border bg-card p-6">
                <label className="block text-sm font-bold">Your WhatsApp enquiry (edit before sending)
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={7} maxLength={1500} className={field} />
                </label>
                <a href={waLink(message)} target="_blank" rel="noopener noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-whatsapp px-6 py-3 font-semibold text-whatsapp-foreground hover:bg-whatsapp/90">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" /> Send on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
