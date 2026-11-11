import { SITE_ORIGIN } from "@/lib/site";

const shareImage = `${SITE_ORIGIN}/favicon.png`;

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

export const meta = (title: string, description: string, path: string) => {
  const url = `${SITE_ORIGIN}${path}`;
  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:image", content: shareImage },
    { property: "og:image:secure_url", content: shareImage },
    { property: "og:image:type", content: "image/png" },
    { property: "og:image:width", content: "512" },
    { property: "og:image:height", content: "512" },
    { property: "og:image:alt", content: "Charos Services Limited logo" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: shareImage },
  ];
};

export const seoHead = (title: string, description: string, path: string) => ({
  meta: meta(title, description, path),
  links: [{ rel: "canonical", href: `${SITE_ORIGIN}${path}` }],
});
