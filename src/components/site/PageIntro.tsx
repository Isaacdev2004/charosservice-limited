export function PageIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <section className="border-b border-border bg-secondary">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-[1.05] md:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{text}</p>
      </div>
    </section>
  );
}

export const meta = (title: string, description: string) => [
  { title },
  { name: "description", content: description },
  { property: "og:title", content: title },
  { property: "og:description", content: description },
  { property: "og:type", content: "website" },
  { name: "twitter:card", content: "summary_large_image" },
];

export const seoHead = (title: string, description: string, path: string) => ({
  meta: [...meta(title, description), { property: "og:url", content: path }],
  links: [{ rel: "canonical", href: path }],
});
